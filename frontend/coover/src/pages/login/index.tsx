import { BackIcon } from '@/components/backIcon'
import Header from '@/components/header'
import LoginForm from '@/components/loginForm'
import MetamaskForm from '@/components/metamaskForm'
import { PageContainer, Title } from '@/styles/pages/login'
import { yupResolver } from '@hookform/resolvers/yup'
import Head from 'next/head'
import { useRouter } from 'next/router' //Função para acessar o router do componente componente
import { useState } from 'react' //É um React Hook que permite adicionar uma variável de estado ao seu componente
import * as yup from 'yup'
import axios from '../../../axios'
import { toast } from 'react-toastify'



export default function Login() {
    //stage se refere ao estado atual da variável de estado (definido para o valor fornecido, nesse caso 0)
    //setStage é a função que permite alterá-lo para qualquer outro valor em resposta à interação
    const router = useRouter()

    //Função para voltar a página
    const backHandler = () => {
        router.replace("/blockchain")
    }

    return (
        <>
            <Head>
                <title>Coover - Login</title>
            </Head>
            <Header />
            <BackIcon onClick={backHandler} />
            <Title>Proteja seu smartphone contra tudo, onde estiver</Title>
            <PageContainer >
                <LoginForm />

            </PageContainer>
        </>
    )
}
