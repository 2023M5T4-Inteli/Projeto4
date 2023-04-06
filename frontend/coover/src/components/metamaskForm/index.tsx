import Image from 'next/image'
import React from 'react'
import { Container, MetamaskAccount, Paragraph } from './style'
import MetamaskImage from '../../assets/images/metamask.png'
import { Button } from '../button'
import { RightIcon } from '../rightIcon'
import { useMetamask } from '@/contexts/metamask'
import { useRouter } from 'next/router'
import axios from '../../../axios'
import { toast } from 'react-toastify'
import { useUser } from '@/contexts/user'

//Tornar objeto (com a propriedade ethereum) global
declare global {
    interface Window {
        // ⚠️ notice that "Window" is capitalized here
        ethereum: any
    }
}

interface Props {
    watch: any
}

//Formulário de conexão com a carteira Metamask.
const MetamaskForm: React.FC<Props> = ({watch}) => {
    const { account, setAccount } = useMetamask() //Definição do hook useMetamask, que recupera o estado da account
    const router = useRouter() //Hook para manipular a navegação
    const {setUser} = useUser()

    //Função para se conectar a metamask
    const connectToMetamask = async () => {
        if (window.ethereum) {
            //Se conecta a carteira através do método abaixo e define o estado da account
            try {
                const res = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                })

                setAccount(res[0])
                const sepolia = '0xaa36a7'
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

    //Se for conectado o usuário é direcionado para a página dashboard
    const handleContinue = async () => {
        const signupForm = watch()
        signupForm.wallet = account

        //função para enviar os dados do formulários para o banco de dados
        try {
            const res = await axios.post('/users/signup', signupForm)
            setUser(res.data)
            toast.success("Usuário cadastrado com sucesso!")
            router.replace("/dashboard")
        } catch (err: any) {
            if (err.response) {
                toast.error(err.response.data)
            } else {

                toast.error("Erro ao cadastrar usuário!")
            }
        }
       
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
                Criar conta <RightIcon />
            </Button>
        </Container>
    )
}





export default MetamaskForm
