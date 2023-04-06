// importar bibliotecas
const express = require("express");
const bcrypt = require("bcryptjs");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const router = express.Router();
const Insurance = require("../models/insurance");
const User = require("../models/user");
const { SeguroFactory, SeguroMutuo } = require("../ethers");
const { ethers } = require("ethers");

//ROTA PARA CRIAR UM GRUPO DE SEGURO (ENVIAR OS CONVITES AOS INTERESSADOS)
router.post("/admin/create", adminMiddleware, async (req, res) => {
  try {
    // Encontre os usuários que não têm um grupo de seguro
    const usersThatDontHaveGroup = await User.find({
      insurance: { $exists: false },
    });

    const invites = [];
    // Verifique se os usuários atendem ao requisito mínimo de valor do telefone e adicione-os aos convites
    for (let i = 0; i < usersThatDontHaveGroup.length; i++) {
      if (usersThatDontHaveGroup[i].phoneValue >= req.body.minPhoneValue) {
        invites.push(usersThatDontHaveGroup[i]._id);
      }
    }

    // Crie uma nova instância do grupo de seguro com os dados fornecidos e os convites
    const insurance = new Insurance({ ...req.body, isActive: false, invites });
    await insurance.save();

    res.send(insurance);
  } catch (err) {
    res.status(500).send(err);
  }
});

// CRIAR ROTA DE APROVAR SEGURO...
router.get("/admin/approve/:id", adminMiddleware, async (req, res) => {
  try {
    // Encontre o grupo de seguro pelo ID fornecido
    const insurance = await Insurance.findOne({ _id: req.params.id });
    if (insurance.isActive) {
      return res.status(500).send("Seguro já está ativo!");
    }

    // Popule os usuários associados ao grupo de seguro
    await insurance.populate("users");

    const invitesUserWallets = [];
    const invitesUserImeis = [];

    // Obtenha os endereços das carteiras e IMEIs dos usuários convidados
    for (let i = 0; i < insurance.users.length; i++) {
      invitesUserWallets.push(insurance.users[i].wallet);
      invitesUserImeis.push(insurance.users[i].imei);
    }

    // Crie uma nova instância do contrato Seguro na blockchain usando a factory
    const seguroFactory = await SeguroFactory();
    const tx = await seguroFactory.createSeguro(
      insurance.adminTax,
      invitesUserWallets,
      invitesUserImeis,
      insurance.lmiTax
    );
    await tx.wait();

    // Obtenha o endereço do contrato recém-criado e salve-o no grupo de seguro
    const seguroAddresses = await seguroFactory.viewSeguros();
    insurance.address = seguroAddresses[seguroAddresses.length - 1];
    insurance.isActive = true;
    insurance.invites = [];
    await insurance.save();

    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

//ROTA PARA VER TODOS OS SEGUROS
router.get("/admin", adminMiddleware, async (req, res) => {
  try {
    // Buscar todos os seguros no banco de dados
    const fetchedInsurances = await Insurance.find({});

    // Se nenhum seguro for encontrado, retorne um erro
    if (fetchedInsurances.length == 0) {
      return res.status(500).send("Nenhum seguro encontrado!");
    }

    // Popular os seguros com os usuários relacionados
    const insurancesPromise = fetchedInsurances.map(
      async (insurance) => await insurance.populate("users")
    );
    const insurances = await Promise.all(insurancesPromise);

    const insurancesWithValue = [];
    for (let i = 0; i < insurances.length; i++) {
      const insuranceObject = insurances[i].toObject();
      if (insurances[i].address) {
        const contractInstance = await SeguroMutuo(insurances[i].address);
        const contractBalance = await contractInstance.getContractBalance();
        const formatedBalance = ethers.utils.formatEther(
          contractBalance.toString()
        );
        insuranceObject.contractTotalValue = formatedBalance;
      } else {
        insuranceObject.contractTotalValue = 0;
      }
      insuranceObject.id = insurances[i]._id;
      insurancesWithValue.push(insuranceObject);
    }

    // Enviar os seguros encontrados como resposta
    res.send(insurancesWithValue);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//ROTA PARA VER UM ÚNICO GRUPO
router.get("/admin/:id", adminMiddleware, async (req, res) => {
  try {
    // Buscar o seguro no banco de dados pelo ID
    const insurance = await Insurance.findOne({ _id: req.params.id });

    // Popular o seguro com os usuários relacionados
    await insurance.populate("users");

    const insuranceObject = insurance.toObject();
    insuranceObject.adminTaxAmount = 0;
    insuranceObject.contractBalance = 0;
    if (insurance.address) {
      const contractInstance = await SeguroMutuo(insurance.address);
      const adminTaxAmountBigNumber = await contractInstance.adminTaxAmount();
      insuranceObject.adminTaxAmount = ethers.utils.formatEther(adminTaxAmountBigNumber);
      const getContractBalanceBigNumber =
        await contractInstance.getContractBalance();
      insuranceObject.contractBalance = ethers.utils.formatEther(getContractBalanceBigNumber);
  }

    // Enviar o seguro encontrado como resposta
    res.send(insuranceObject);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//ROTA PARA VER O GRUPO QUE O USUÁRIO PARTICIPA
router.get("/user/me", authMiddleware, async (req, res) => {
  try {
    // Se o usuário não está participando de nenhum seguro, retorne um erro
    if (!req.user.insurance) {
      return res
        .status(500)
        .send("Esse usuário ainda não participa de um grupo");
    }

    // Buscar o seguro no banco de dados pelo ID
    const insurance = await Insurance.findOne({ _id: req.user.insurance });
    await insurance.populate("users");
    const insuranceObject = insurance.toObject();
    if (insurance.address) {
      const contractInstance = await SeguroMutuo(insurance.address);
      const contractBalanceBigNumber =
        await contractInstance.getContractBalance();
      insuranceObject.contractBalance = contractBalanceBigNumber.toNumber();
    }

    // Enviar o seguro encontrado como resposta
    res.send(insuranceObject);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// ROTA PARA VER MEUS CONVITES
router.get("/user/invites", authMiddleware, async (req, res) => {
  try {
    // Se o usuário já está participando de um seguro, retorne um erro
    if (req.user.insurance) {
      return res.status(500).send("Esse usuário já participa de um grupo");
    }

    // Popular o usuário com os convites relacionados
    await req.user.populate("invites");

    // Enviar os convites encontrados como resposta
    res.send(req.user.invites);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ROTA PARA VER UM CONVITE
router.get("/user/invites/:id", authMiddleware, async (req, res) => {
  try {
    // Popular o usuário com os convites relacionados
    await req.user.populate("invites");

    const invite = req.user.invites.filter(
      (invite) => invite._id == req.params.id
    );

    // Enviar os convites encontrados como resposta
    res.send(invite[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// ROTA PARA ACEITAR UM CONVITE
router.patch("/user/invite", authMiddleware, async (req, res) => {
  try {
    // Se o usuário já está participando de um seguro, retorne um erro
    if (req.user.insurance) {
      return res.status(500).send("Esse usuário já participa de um grupo");
    }

    // Buscar o seguro no banco de dados pelo ID
    const insurance = await Insurance.findOne({ _id: req.body.insurance });
    if (insurance.isActive) {
      return res.status(500).send("Seguro já ativo!");
    }

    // Popular o seguro com os usuários relacionados
    await insurance.populate("users");

    // Se o seguro não for encontrado, retorne um erro
    if (!insurance) {
      return res.status(500).send("Seguro não encontrado");
    }

    // Se o seguro não tiver convites, retorne um erro
    if (!insurance.invites) {
      return res.status(500).send("Esse seguro não possui convites");
    }

    // Verificar se o usuário tem um convite válido para o seguro
    let exists = false;
    for (let i = 0; i < insurance.invites.length; i++) {
      if (insurance.invites[i].equals(req.user._id)) {
        exists = true;
      }
    }

    // Se o usuário não foi convidado para o seguro, retorne um erro
    if (!exists) {
      return res
        .status(500)
        .send("Esse usuário não foi chamado para este grupo");
    }

    // Se o seguro já atingiu o número máximo de participantes, retorne um erro
    if (insurance.users.length >= insurance.maxPeople) {
      return res
        .status(500)
        .send(
          "Não foi possível aceitar o convite, seguro já alcançou o número máximo de participantes"
        );
    }

    // Atualizar o usuário com a informação do seguro aceito
    req.user.insurance = req.body.insurance;
    await req.user.save();

    // Enviar o usuário atualizado como resposta
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/contracts", adminMiddleware, async (req, res) => {
  try {
    // Criar uma instância da fábrica de seguros
    const seguroFactory = await SeguroFactory();

    // Visualizar os seguros disponíveis
    const tx = await seguroFactory.viewSeguros();

    // Enviar os seguros encontrados como resposta
    res.send(tx);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Exportar o módulo de rotas
module.exports = router;
