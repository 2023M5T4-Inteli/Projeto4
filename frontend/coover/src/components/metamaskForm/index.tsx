import Image from 'next/image'
import React from 'react'
import { Container, MetamaskAccount, Paragraph } from './style'
import MetamaskImage from '../../assets/images/metamask.png'
import { Button } from '../button'
import { RightIcon } from '../rightIcon'
import { useMetamask } from '@/contexts/metamask'
import { useRouter } from 'next/router'

//Tornar objeto (com a propriedade ethereum) global
declare global {
    interface Window {
        // ⚠️ notice that "Window" is capitalized here
        ethereum: any
    }
}

//Formulário de conexão com a carteira Metamask.
const MetamaskForm: React.FC = () => {
    const { account, setAccount } = useMetamask() //Definição do hook useMetamask, que recupera o estado da account
    const router = useRouter() //Hook para manipular a navegação

    //Função para se conectar a metamask
    const connectToMetamask = async () => {
        if (window.ethereum) {
            //Se conecta a carteira através do método abaixo e define o estado da account
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
            //Caso haja algum erro
            } catch (err) {
                console.error(err)
            }
        //Caso não tenha a metamask instalada
        } else {
            alert('Install MetaMask')
        }
    }

    //Se for conecatado o usuário é direcionado para a página dashboard
    const handleContinue = () => {
        router.replace("/dashboard")
    }

    //Retorna a interface do formulário
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
                //Retorna o endereço da carteira da conta conectado 
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
