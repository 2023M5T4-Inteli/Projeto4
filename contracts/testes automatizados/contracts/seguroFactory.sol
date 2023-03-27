// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8;
import "./seguroSprint4.sol";
contract SeguroFactory{
    /// DEBUG
    address owner;
    address[] public ownerSeguro;
    uint256 adminTaxSeguro;
    uint256[] public adminTaxSeguros;
    uint lmiTaxSeguro;
    uint[] public lmiTaxSeguros;

    // Endereço dos seguros criados
    address[] public seguros;
    constructor(){
        owner = msg.sender;
    }
    modifier isOwner(){
        require(owner == msg.sender, "Not owner");
        _;
    }

    // Cria o seguro a partir dos argumentos passados
    function createSeguro(
        uint256 _adminTax,
        address[] memory _members,
        string[] memory _imeis,
        uint _lmiTax
    ) public isOwner{
        Seguro2 seguro = new Seguro2(
         _adminTax,
         _members,
         _imeis,
         _lmiTax,
         owner
        );
        seguros.push(address(seguro));

        /// DEBUG
        ownerSeguro.push(seguro.getOwner());
        (,adminTaxSeguro,) = seguro.getInfo();
        adminTaxSeguros.push(adminTaxSeguro);
        (,,lmiTaxSeguro) = seguro.getInfo();
        lmiTaxSeguros.push(lmiTaxSeguro);
    }
}