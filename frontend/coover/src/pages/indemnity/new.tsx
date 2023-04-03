import { BackIcon } from '@/components/backIcon'
import Header from '@/components/header'
import IndemnityForm from '@/components/indemnityForm'
import MetamaskForm from '@/components/metamaskForm'
import PageWrapper from '@/components/pageWrapper'
import { StartText } from '@/components/startText'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from '../../../axios'

export default function NewIndemnity() {
    
    const router = useRouter()

    const backHandler = () => {
        router.replace('/indemnity')
    }

    return (
        <>
            <Head>
                <title>Coover - Login</title>
            </Head>
            <PageWrapper>
                <>
                    <BackIcon onClick={backHandler} />
                    <StartText>
                        Indenização <br />
                        Acione seu seguro
                    </StartText>
                    <IndemnityForm />
                </>
            </PageWrapper>
        </>
    )
}
