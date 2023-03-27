// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;
// This import is automatically injected by Remix
import "remix_tests.sol";
// This import is required to use custom transaction context
import "remix_accounts.sol";
// Importa o seguro factory
import "../contracts/seguroSprint4.sol";

contract testSuite {
    Seguro2 public seguro;

    // Inicialização das variáveis referentes a diferentes contas
    address acc0;
    address acc1;
    address acc2;

    /// ARRANGE
    // Antes de todos os testes, é criado uma instância de contrato.
    function beforeEach() public {
        // Atribuição de contas às variáveis
        acc0 = TestsAccounts.getAccount(0); //coover
        acc1 = TestsAccounts.getAccount(1);
        acc2 = TestsAccounts.getAccount(2);

        // Para ser passado como argumento, o array de endereços deve ser estático
        address[] memory addresses = new address[](2);
        addresses[0] = acc1;
        addresses[1] = acc2;
        // Para ser passado como argumento, o array de Imeis deve ser estático
        string[] memory imeis = new string[](2);
        imeis[0] = "0001";
        imeis[1] = "0002";

        // Instancia o seguro
        seguro = new Seguro2(10, addresses, imeis, 10, acc0);
    }
    
    /// ASSERT
    //Verifica se o owner do seguro realmente é quem fez o deploy
    function checkOwnerSeguro() public {
        Assert.equal(seguro.getOwner(), acc0, "Owner should be acc0");
    }

    // Verifica se o endereço foi relacionado ao Imei correto.
    // A anotação especial NatSpec "#sender: account-1" é utilizada para indicar qual conta será usada como msg.sender.
    /// #sender: account-1
    function testeImei() public{
        Assert.equal(seguro.getMemberImei(msg.sender), "0001", "Imei nao bate");
    }

    //Verifica se quem faz o pagamento da taxa é membro do contrato (foi ativado)
    /// #sender: account-1
    /// #value: 10
    function checkFirstPaymentMember() payable public{
        seguro.firstPayment();
        Assert.equal(seguro.getMemberIsActive(msg.sender), true, "acc1 wasn't activated");
    }

}