import Image from 'next/image'
import React from 'react'
import { Container, MetamaskAccount, Paragraph } from './style'
import MetamaskImage from '../../assets/images/metamask.png'
import { Button } from '../button'
import { RightIcon } from '../rightIcon'
import { useMetamask } from '@/contexts/metamask'
import { useRouter } from 'next/router'

declare global {
    interface Window {
        // ⚠️ notice that "Window" is capitalized here
        ethereum: any
    }
}

const MetamaskForm2: React.FC = () => {
    const { account, setAccount } = useMetamask()
    const router = useRouter()

    const connectToMetamask = async () => {
        if (window.ethereum) {
            try {
                const res = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                })

                // Checar aqui se carteira da metamask é a mesma que está cadastrada no sistema (caso seja a página de login)

                setAccount(res[0])
                const goerliNetwork = '0x5'
                if (window.ethereum.chainId !== goerliNetwork) {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: goerliNetwork }]
                    })
                }
            } catch (err) {
                console.error(err)
            }
        } else {
            alert('Install MetaMask')
        }
    }

    const handleContinue = () => {
        router.replace("/admin/walletCoover")
    }

    return (
        <Container>


            <Image
                src={MetamaskImage}
                onClick={connectToMetamask}
                alt="Metamask Image"
            />
            {account ? (
                <MetamaskAccount>
                    Endereço conectado: <br />
                    {account}
                </MetamaskAccount>
            ) : (
                <span>

                </span>
            )}


        </Container>
    )
}





export default MetamaskForm2
