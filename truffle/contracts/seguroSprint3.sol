// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.19;
/*Importação de biblioteca que faz com que as equações da indenização funcionem, visto que com operações 
normais os valores resultantes estavam excedendo os limites do tipo de dados usado para armazenar o valor*/
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
// Primeiramente são definidas as variáveis e seus tipos sendo elas:
// endereço -> Coover (dona e administradora do contrato)
// inteiro -> taxa administrativa
// inteiro -> percentual do limite máximo indenizável
// mapping (DHT) -> endereço de carteiras dos membros são chaves que levam ao IMEI dos celulares
// mapping (DHT) -> endereço de carteiras dos membros são chaves ao valor que possuem de reseva pessoal
contract SeguroMutuo {
    using SafeMath for uint256;
    address payable owner;
    uint256 adminTax;
    uint256 public adminTaxAmount;
    uint256 lmiTax;
    mapping(address => string) memberImei;
    mapping(address => uint256) memberFunds;
    mapping(address => bool) memberIsActive;
    //modifier para ser usado quando só o owner do contrato (Coover) pode realizar a função
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    //modifier para ser usado para conferir se o usuário está ativo no contrato
    modifier isActive(address _userAddress) {
        require(memberIsActive[_userAddress]);
        _;
    }

    /*Regra de negócio: A Coover é definida como dona e administradora do contrato, 
devendo estabelecer os membros deste e seus IMEIs dos aparelhos protegidos, 
assim como a taxa administrativa*/
    constructor(
        uint256 _adminTax,
        address[] memory _members,
        string[] memory _imeis,
        uint _lmiTax,
        address _owner
    ) {
        owner = payable(_owner);
        adminTax = _adminTax;
        /*o loop abaixo utiliza o mapping member para conferir se a chave (address) aponta
         para o imei e fundos corretos e se os dois estão no mesmo índice de seus respectivos arrays*/
        for (uint256 i = 0; i < _members.length; i++) {
            memberImei[_members[i]] = _imeis[i];
            memberFunds[_members[i]] = 0;
            memberIsActive[_members[i]] = false;
        }
        lmiTax = _lmiTax;
    }

    //essa função retorna o imei do membro como string
    function realMember(address _address) public view returns (string memory) {
        return memberImei[_address];
    }

    /*Regra de negócio: os membros, no deploy do contrato, devem realizar um pagamento inicial*/
    /*a função compara o hash do usuário que realizou a transação (msg.sender) não é distinto
    com os que estão no contrato do mapping member, para que ela se concretize*/
    function firstPayment() public payable {
        require(inverseCompare(memberImei[msg.sender], ""), "Deu ruim");
        memberFunds[msg.sender] += msg.value - ((msg.value * adminTax) / 100); //aqui é recalculado os fundos do segurado, de zero ao valor pago por ele, levando em consideração a taxa percentual administrativa subtraída do valor total pago
        adminTaxAmount += (msg.value * adminTax) / 100;
        memberIsActive[msg.sender] = true; //após o pagamento o cliente está ativo para realizar demais funções no contrato
    }
    //A função abaixo é utilizada para comparar strings no Solidity, fazendo o hash das duas para a comparação, que aqui devem ser distintas
    function inverseCompare(string memory str1, string memory str2)
        public
        pure
        returns (bool)
    {
        return
            keccak256(abi.encodePacked(str1)) !=
            keccak256(abi.encodePacked(str2));
    }
    //A função abaixo é utilizada para comparar strings no Solidity, fazendo o hash das duas para a comparação, que aqui devem ser iguais
    function compare(string memory str1, string memory str2)
        public
        pure
        returns (bool)
    {
        return
            keccak256(abi.encodePacked(str1)) ==
            keccak256(abi.encodePacked(str2));
    }

    /* Regra de negócio: a Coover deve aprovar a indenização de um segurado e, a partir disso,
     informar a carteira dele. O hash do segurado em que o sinistro ocorreu deve ser igual ao 
     que está armazenado no contrato de sua carteira para que seja concretizado*/
    function indemnity(
        address payable _userAddress,
        string memory _imei,
        uint256 _indemnity,
        address[] memory _members
    ) public payable onlyOwner isActive(_userAddress) {
        require(
            compare(memberImei[_userAddress], _imei),
            "IMEI fornecido nao corresponde"
        ); //confere se o imei fornecido para aquela carteira é o mesmo do mapping guardado nesse contrato
        uint userFunds = memberFunds[_userAddress];
        /*Se os fundos do usuário, multiplicados pela taxa de limite máximo indenizável,
         forem maiores ou iguais ao valor da indenização, o valor é transferido para a 
         carteira e é retirado dos fundos do usuário*/
        if (userFunds.mul(lmiTax) >= _indemnity){
            _userAddress.transfer(_indemnity);
            memberFunds[_userAddress] = userFunds.sub(_indemnity);
        }
        /* Caso isso não ocorra, pega-se o resto da indenização, sem o valor do fundo da carteira 
        que requisitou a indenização. É calculada a porcentagem proporcional ao valor resguardado de 
        cada carteira, dividindo o total de fundos dos membros pelo valor de balanço do contrato
        menos os fundos da carteira que requisitou a indenização. Posteriormente, o valor que 
        cada membro irá compor na indenização é calculado multiplicando o resto da indenização, 
        ou seja, seu valor inteiro menos os fundos do indenizado, pela porcentagem de participação 
        calculada anteriormente. Por fim todos os fundos pessoais dos membros são recalculados
         e a transferência é concluída.*/

        else {
           uint256 indemnityRest = _indemnity.sub(userFunds);
            memberFunds[_userAddress] = 0;
            uint256 totalFunds = address(this).balance.sub(userFunds);

            for (uint i = 0; i < _members.length; i++){
                require(totalFunds>0, "Nao ha fundos suficientes para distribuir"); //verifica se a reserva total é maior que 0, caso contrário a função não se realiza
                uint256 memberFundsBefore = memberFunds[_members[i]];
                uint percentage = memberFundsBefore.mul(1e18).div(totalFunds);
                uint memberIndemnity = indemnityRest.mul(percentage).div(1e18);
                memberFunds[_members[i]] = memberFundsBefore.sub(memberIndemnity);
            }
            _userAddress.transfer(_indemnity);

        }
    }

    // Regra de negócio: A Coover pode retirar a taxa administrativa a qualquer momento
    function adminWithdrawal() public onlyOwner {
        owner.transfer(adminTaxAmount);
    }

    //Regra de negócio: O cliente deve conseguir ver seu valor de resera para conferir o valor protegido do seguro.
    function viewUserBalance() public view isActive(msg.sender) returns (uint256) {
        return memberFunds[msg.sender];
    }

    //Regra de negócio: O cliente deve conseguir repor sua reserva.
    function replaceBackup() public payable isActive(msg.sender) {
        require(inverseCompare(memberImei[msg.sender], ""), "Deu ruim");
        memberFunds[msg.sender] += msg.value;
    }
    //Regra de negócio: os usuários e a Coover devem visualizar o balanço total do contrato 
    function getContractBalance() public view returns (uint) {
        return address(this).balance; 
    }
}


//Para realizar o deploy do contrato, veja o arquivo "1_deployContract.js" na pasta "migrations"