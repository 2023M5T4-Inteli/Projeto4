const { ethers } = require('ethers')
const seguroFactoryJson = require('../contracts/SeguroFactory.json')

const SeguroFactory = async () => {
    const { MNEMONIC, INFURA_API_KEY, SEGURO_FACTORY_ADDRESS } = process.env
    const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/' + INFURA_API_KEY)
    const wallet = ethers.Wallet.fromMnemonic(MNEMONIC)
    const connectedWallet = wallet.connect(provider)
    
    const contract = new ethers.Contract(SEGURO_FACTORY_ADDRESS, seguroFactoryJson.abi, connectedWallet)

    return contract
}

module.exports = { SeguroFactory }
