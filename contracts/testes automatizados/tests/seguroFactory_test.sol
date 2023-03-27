// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;
// This import is automatically injected by Remix
import "remix_tests.sol";
// This import is required to use custom transaction context
import "remix_accounts.sol";
// Importa o seguro factory
import "../contracts/seguroFactory.sol";

contract testSuite {
    SeguroFactory public seguroFactory;
    uint lmiTax;
    uint256 adminTax;

    /// Inicialização das variáveis referentes a diferentes contas
    address acc0;
    address acc1;
    address acc2;

    ///ARRANGE
    // Antes de todos os testes, é criado uma instância de contrato.
    function beforeAll() public {
        // Atribuição de contas às variáveis
        acc0 = TestsAccounts.getAccount(0);
        acc1 = TestsAccounts.getAccount(1);
        acc2 = TestsAccounts.getAccount(2);

        // Instancia o seguro factory
        seguroFactory = new SeguroFactory();
    }

    ///ACT
    // Função que checa a criação do seguro de acordo com os argumentos passados
    function checkCreateSeguro() public{
        adminTax = 10;
        lmiTax = 10;

        // Para ser passado como argumento, o array de endereços deve ser estático
        address[] memory addresses = new address[](2);
        addresses[0] = acc1;
        addresses[1] = acc2;
        // Para ser passado como argumento, o array de Imeis deve ser estático
        string[] memory imeis = new string[](2);
        imeis[0] = "0001";
        imeis[1] = "0002";  

        // Criação do seguro
        seguroFactory.createSeguro(adminTax, addresses, imeis, lmiTax);

        ///ASSERT
        // Verifica se a taxa administrativa foi realmente definida como 10% ao usar o seguro factory
        Assert.equal(adminTax, seguroFactory.adminTaxSeguros(0), "Taxa administrativa deveria ser 10");
        // Verifica se o valor percentual mínimo foi realmente definido como 10% ao usar o seguro factory
        Assert.equal(adminTax, seguroFactory.lmiTaxSeguros(0), "Valor percentual minimo deveria ser 10");
    }
}