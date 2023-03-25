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

const MetamaskForm: React.FC = () => {
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
                const sepolia = '0xaa36a7'
                console.log(window.ethereum.chainId)
                if (window.ethereum.chainId !== sepolia) {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: sepolia }]
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
        router.replace("/dashboard")
    }

    return (
        <Container>
            <Paragraph>
                Conecte-se com uma carteira da Metamask
            </Paragraph>

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
                    Se você ainda não possui, instale o aplicativo primeiro*
                </span>
            )}

            <Button onClick={handleContinue} disabled={!account}>
                Continuar <RightIcon />
            </Button>
        </Container>
    )
}





export default MetamaskForm
