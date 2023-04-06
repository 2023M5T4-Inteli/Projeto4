// importar bibliotecas
const express = require("express");
const bcrypt = require("bcryptjs");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const Indemnity = require("../models/indemnity");
const router = express.Router();
const bycrypt = require("bcryptjs");

//ROTA PARA PEDIR UMA NOVA INDENIZAÇÃO
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const isImeiEqual = await bycrypt.compare(req.user.imei, req.body.imei);
    if (isImeiEqual) {
      return res.status(500).send("Imei diferente do cadastrado!");
    }

    if (req.body.value > req.user.phoneValue) {
      return res
        .status(500)
        .send("Valor requisitado não deve ser maior que o do seu celular!");
    }

    // Cria uma nova instância do modelo de Indemnity com os dados do corpo da requisição
    const indemnity = new Indemnity({ ...req.body, user: req.user._id });

    // Define a propriedade 'approved' como false por padrão
    indemnity.approved = false;
    // Salva a nova instância de Indemnity no banco de dados
    await indemnity.save();

    // Retorna um status 200 (OK) após salvar com sucesso
    res.send();
  } catch (err) {
    console.log(err);
    // Retorna um erro 500 (Erro Interno do Servidor) em caso de falha
    res.status(500).send(err);
  }
});

//ROTA PARA VISUALIZAR AS INDENIZAÇÕES
router.get("/admin", adminMiddleware, async (req, res) => {
  try {
    // Busca todos os documentos de Indemnity no banco de dados
    const indemnities = await Indemnity.find({});
    for (let i = 0; i < indemnities.length; i++) {
      await indemnities[i].populate("user");
    }
    console.log(indemnities)
    // Retorna os documentos encontrados no formato JSON
    res.json(indemnities);
  } catch (err) {
    // Retorna um erro 500 (Erro Interno do Servidor) em caso de falha
    res.status(500).send(err);
  }
});

//ROTA PARA O USUÁRIO VER UMA INDENIZAÇÃO
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // Busca o documento de Indemnity correspondente ao ID fornecido e associado ao usuário atual
    const indemnities = await Indemnity.find({ user: req.user._id }).sort(
      "created_at"
    );

    if (indemnities.length == 0) {
      res.status(500).send("Nenhuma indenização solicitada!");
      return;
    }
    // Retorna o documento encontrado
    res.send(indemnities[indemnities.length - 1]);
  } catch (err) {
    console.log(err);
    // Retorna um erro 500 (Erro Interno do Servidor) em caso de falha
    res.status(500).send(err);
  }
});

//ROTA PARA O ADMINISTRADOR VER UMA INDENIZAÇÃO
router.get("/admin/:id", adminMiddleware, async (req, res) => {
  try {
    // Busca o documento de Indemnity correspondente ao ID fornecido
    const indemnity = await Indemnity.findOne({ _id: req.params.id });

    // Retorna o documento encontrado
    res.send(indemnity);
  } catch (err) {
    // Retorna um erro 500 (Erro Interno do Servidor) em caso de falha
    res.status(500).send(err);
  }
});

//ROTA PARA O ADMINISTRADOR APROVAR OU RECUSAR UMA INDENIZAÇÃO
router.patch("/admin/:id", adminMiddleware, async (req, res) => {
  try {
    // Busca o documento de Indemnity correspondente ao ID fornecido
    const updatedindemnity = await Indemnity.findOne({ _id: req.params.id });
    // Atualiza o valor da propriedade 'approved' com o valor fornecido no corpo da requisição
    updatedindemnity.approved = req.body.approved;
    // Salva o documento atualizado no banco de dados
    await updatedindemnity.save();

    // Retorna o documento atualizado
    res.send(updatedindemnity);
  } catch (err) {
    // Retorna um erro 500 (Erro Interno do Servidor) em caso de falha
    res.status(500).send(err);
  }
});

module.exports = router;
