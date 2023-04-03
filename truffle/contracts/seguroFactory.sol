// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

import "./seguroSprint3.sol";

contract SeguroFactory {
    address owner;

    address[] public seguros;

    constructor() {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(owner == msg.sender, "Not owner");
        _;
    }

    function viewSeguros() public view returns (address[] memory) {
        return seguros;
    }

    function createSeguro(
        uint256 _adminTax,
        address[] memory _members,
        string[] memory _imeis,
        uint _lmiTax
    ) public isOwner {
        SeguroMutuo seguro = new SeguroMutuo(
            _adminTax,
            _members,
            _imeis,
            _lmiTax,
            owner
        );
        seguros.push(address(seguro));
    }
}
