const contrato = artifacts.require("nSeguro");

module.exports = function(deployer) {
    // deployment steps
    deployer.deploy(contrato, 10, ["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"], ["imei1", "imei2"], 15);
  };