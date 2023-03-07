const contrato = artifacts.require("Seguro2");

module.exports = function(deployer) {
    // deployment steps
    deployer.deploy(contrato, 10, ["0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db", "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB"], ["imei1", "imei2"], 15);
  };

  //Para realizar com sucesso o deploy, na linha 5 devem ser escritas as seguintes informações, como o exemplo acima:
  //contrato -> não muda
  //taxa administrativa (número inteiro, o contrato realiza essa transformação para valor percentual) -> no exemplo está como "10"
  // endereços de carteira -> em um array de [] e todos os endereços devem estar entre aspas duplas " " e separados por vírgula
  // imeis de celular -> em um arrat de [] e todos os imeis devem estar entre aspas duplas " " e separados por vírgula. ATENÇÃO: o índice do IMEI deve ser o mesmo índice de sua carteira no array anterior
  // taxa de limite máximo indenizável -> segue a mesma lógica da taxa administrativa, é a porcentagem do valor que deve ser mantido em reserva