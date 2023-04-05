const { ethers } = require('ethers')
const seguroFactoryJson = require('../contracts/SeguroFactory.json')
const seguroMutuoJson = require('../contracts/SeguroMutuo.json')

//Cria o Contrato Factory
const SeguroFactory = async () => {
    const { MNEMONIC, INFURA_API_KEY, SEGURO_FACTORY_ADDRESS } = process.env //Acessa a seed phrase, api e endereco a partir do .env
    const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/' + INFURA_API_KEY) //API da Infura
    const wallet = ethers.Wallet.fromMnemonic(MNEMONIC) //Acessa a wallet através da seed phrase
    const connectedWallet = wallet.connect(provider) //Conecta a wallet à infura

    // const provider = new ethers.providers.Web3provider(window.ethereum)
    
    //Instancia o contrato
    const contract = new ethers.Contract(SEGURO_FACTORY_ADDRESS, seguroFactoryJson.abi, connectedWallet)

    return contract
}

//Cria o Seguro mútuo
const SeguroMutuo = async (address) => {
    const {MNEMONIC, INFURA_API_KEY} = process.env //Acessa a seed phrase, api e endereco a partir do .env
    const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/' + INFURA_API_KEY) //API da Infura
    const wallet = ethers.Wallet.fromMnemonic(MNEMONIC) //Acessa a wallet através da seed phrase
    const connectedWallet = wallet.connect(provider) //Conecta a wallet à infura

    //Instancia o contrato
    const insurance = new ethers.Contract(address, seguroMutuoJson.abi, connectedWallet)

    return insurance
}

// Exporta as funções SeguroFactory e SeguroMutuo para que possam ser usadas em outros arquivos
module.exports = { SeguroFactory, SeguroMutuo }
