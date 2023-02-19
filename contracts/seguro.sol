// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

// Primeiramente são definidas as variáveis e seus tipos sendo elas:
// endereço -> Coover (dona e administradora do contrato)
// inteiro -> taxa administrativa
// mapping (DHT) -> endereço de carteiras dos membros são chaves que levam ao IMEI dos celulares
// mapping (DHT) -> endereço de carteiras dos membros são chaves ao valor que possuem de reseva pessoal
contract Seguro {
    address payable owner;
    uint256 adminTax;
    uint adminTaxAmount;
    mapping(address => string) memberImei;
    mapping(address => uint256) memberFunds;
//modifier para ser usado quando só o owner do contrato (Coover) pode realizar a função
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /*Regra de negócio 1: A Coover é definida como dona e administradora do contrato, 
devendo estabelecer os membros deste e seus IMEIs dos aparelhos protegidos, 
assim como a taxa administrativa*/
    constructor(
        uint256 _adminTax,
        address[] memory _members,
        string[] memory _imeis
    ) {
        owner = payable(msg.sender);
        adminTax = _adminTax;
        /*o loop abaixo utiliza o mapping member para conferir se a chave (address) aponta
         para o imei e fundos corretos e se os dois estão no mesmo índice de seus respectivos arrays*/
        for (uint256 i = 0; i < _members.length; i++) {
            memberImei[_members[i]] = _imeis[i];
            memberFunds[_members[i]] = 0;
        }
    }

    //essa função retorna o imei do membro como string
    function realMember(address _address) public view returns (string memory) {
        return memberImei[_address];
    }

    /*Regra de negócio 2: os membros, no deploy do contrato, devem realizar um pagamento inicial*/
    /*a função compara o hash do usuário que realizou a transação (msg.sender) não é distinto
    com os que estão no contrato do mapping member, para que ela se concretize*/
    function payment() public payable {
        require(inverseCompare(memberImei[msg.sender], ""), "Deu ruim");
        memberFunds[msg.sender] += msg.value-(msg.value*adminTax/100); //aqui é recalculado os fundos do segurado, de zero ao valor pago por ele, levando em consideração a taxa percentual administrativa subtraída do valor total pago
        adminTaxAmount += msg.value*adminTax/100;
    }

    function inverseCompare(string memory str1, string memory str2)
        public
        pure
        returns (bool)
    {
        return
            keccak256(abi.encodePacked(str1)) !=
            keccak256(abi.encodePacked(str2));
    }

    function compare(string memory str1, string memory str2)
        public
        pure
        returns (bool)
    {
        return
            keccak256(abi.encodePacked(str1)) ==
            keccak256(abi.encodePacked(str2));
    }

    /* Regra de negócio 3: a Coover deve aprovar a indenização de um segurado e, a partir disso,
     informar a carteira dele. O hash do segurado em que o sinistro ocorreu deve ser igual ao 
     que está armazenado no contrato de sua carteira para que seja concretizado*/
    function indemnity(
        address payable _userAddress,
        string memory _imei,
        uint256 _indemnity
    ) public onlyOwner {
        require(
            compare(memberImei[_userAddress], _imei),
            "IMEI fornecido nao corresponde"
        );
        require(_indemnity <= memberFunds[_userAddress]); // confere se o valor do fundo é superior ou igual ao da indenização requirida, caso não seja, a indenização não ocorre
        _userAddress.transfer(_indemnity); //o método utilizado aqui (transfer), só funciona com <2300, ou seja, não recomendado fazer em horários de pico
        memberFunds[_userAddress] -= _indemnity; // recalcula o fundo do segurado
    }
    // Regra de negócio 4: A Coover pode retirar a taxa administrativa a qualquer momento 
    function adminWithdrawal() onlyOwner public{
        owner.transfer(adminTaxAmount);
    }
}
