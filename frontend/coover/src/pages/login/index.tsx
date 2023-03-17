import { BackIcon } from '@/components/backIcon'
import Header from '@/components/header'
import LoginForm from '@/components/loginForm'
import MetamaskForm from '@/components/metamaskForm'
import { PageContainer, Title } from '@/styles/pages/login'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Login() {
    const [stage, setStage] = useState(0)
    const router = useRouter()

    const backHandler = () => {
        if (stage == 0) {
            router.replace("/blockchain")
        } else if (stage == 1) {
            setStage(0)
        }
    }

    return (
        <>
            <Head>
                <title>Coover - Login</title>
            </Head>
            <Header />
            <BackIcon onClick={backHandler} />
            <Title>Proteja seu smartphone contra tudo, onde estiver</Title>
            <PageContainer stage={stage}>
                <LoginForm setStage={setStage} />
                <MetamaskForm />
            </PageContainer>
        </>
    )
}
