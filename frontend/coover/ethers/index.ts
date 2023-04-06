import { ethers } from 'ethers'
import seguroFactoryJson from '../contracts/SeguroFactory.json'
import seguroMutuoJson from '../contracts/SeguroMutuo.json'

export const SeguroFactory = async () => {
    const { NEXT_PUBLIC_SEGURO_FACTORY_ADDRESS } = process.env

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
        NEXT_PUBLIC_SEGURO_FACTORY_ADDRESS!,
        seguroFactoryJson.abi,
        signer
    )

    return contract
}

export const SeguroMutuo = async (address: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();

    const insurance = new ethers.Contract(
        address,
        seguroMutuoJson.abi,
        signer
    )

    return insurance
}

