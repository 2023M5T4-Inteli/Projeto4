import { BackIcon } from '@/components/backIcon'
import { Button } from '@/components/button'
import Header from '@/components/header'
import MetamaskForm from '@/components/metamaskForm'
import SignupForm from '@/components/signupForm'
import { PageContainer, Title } from '@/styles/pages/signup'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Signup() {
    const [stage, setStage] = useState(0)
    const router = useRouter()

    const backHandler = () => {
        if (stage == 0) {
            router.replace("/")
        } else if (stage == 1) {
            setStage(0)
        }
    }

    return (
        <>
            <Head>
                <title>Coover - Criar conta</title>
            </Head>
            <Header />
            <BackIcon onClick={backHandler}/>
            <Title>Proteja seu smartphone contra tudo, onde estiver</Title>

            <PageContainer stage={stage}>
                <SignupForm setStage={setStage} />
                <MetamaskForm />
            </PageContainer>
        </>
    )
}
