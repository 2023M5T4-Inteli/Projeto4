const contrato = artifacts.require("Seguro2");

module.exports = function(deployer) {
    // deployment steps
    deployer.deploy(contrato, 10, ["0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db", "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB"], ["imei1", "imei2"], 15);
  };