const contrato = artifacts.require("SeguroFactory");

module.exports = function(deployer) {
    // deployment steps
    deployer.deploy(contrato);
  };

  //Para realizar com sucesso o deploy, na linha 5 devem ser escritas as seguintes informações, como o exemplo acima:
  //contrato -> não muda
  //taxa administrativa (número inteiro, o contrato realiza essa transformação para valor percentual) -> no exemplo está como "10"
  // endereços de carteira -> em um array de [] e todos os endereços devem estar entre aspas duplas " " e separados por vírgula
  // imeis de celular -> em um arrat de [] e todos os imeis devem estar entre aspas duplas " " e separados por vírgula. ATENÇÃO: o índice do IMEI deve ser o mesmo índice de sua carteira no array anterior
  // taxa de limite máximo indenizável -> segue a mesma lógica da taxa administrativa, é a porcentagem do valor que deve ser mantido em reserva