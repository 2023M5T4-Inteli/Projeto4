const { ethers } = require('ethers')
const seguroFactoryJson = require('../contracts/SeguroFactory.json')
const seguroMutuoJson = require('../contracts/SeguroMutuo.json')

const SeguroFactory = async () => {
    const { MNEMONIC, INFURA_API_KEY, SEGURO_FACTORY_ADDRESS } = process.env
    const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/' + INFURA_API_KEY)
    const wallet = ethers.Wallet.fromMnemonic(MNEMONIC)
    const connectedWallet = wallet.connect(provider)

    // const provider = new ethers.providers.Web3provider(window.ethereum)
    
    const contract = new ethers.Contract(SEGURO_FACTORY_ADDRESS, seguroFactoryJson.abi, connectedWallet)

    return contract
}

const SeguroMutuo = async (address) => {
    const {MNEMONIC, INFURA_API_KEY} = process.env
    const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/' + INFURA_API_KEY)
    const wallet = ethers.Wallet.fromMnemonic(MNEMONIC)
    const connectedWallet = wallet.connect(provider)

    const insurance = new ethers.Contract(address, seguroMutuoJson.abi, connectedWallet)

    return insurance
}

module.exports = { SeguroFactory, SeguroMutuo }
