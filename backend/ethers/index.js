const  { ethers } = require('ethers') 
const campaignFactoryJson = require('../contracts/SeguroFactory.json')

const SeguroFactory = async () => {
    console.log(ethers)

    const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/" + process.env.INFURA_API_KEY);

    const contractAddress = process.env.SEGURO_FACTORY_ADDRESS
    const contract = new ethers.Contract(contractAddress, campaignFactoryJson.abi, provider)

    const privateKey = process.env.MNEMONIC
    const wallet = new ethers.Wallet(privateKey, provider)

    return contract.connect(wallet)

}

module.exports = {SeguroFactory}
