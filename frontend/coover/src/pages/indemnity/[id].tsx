import { BackIcon } from '@/components/backIcon'
import IndemnityForm from '@/components/indemnityForm'
import PageWrapper from '@/components/pageWrapper'
import { StartText } from '@/components/startText'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import axios from '../../../axios'
import RequireAuthentication from '@/HOC/requireAuthentication'

export enum IndemnityStatus {
    requested,
    analysis,
    accepted,
    denied
}

interface IndemnityInterface {
    status: IndemnityStatus
}

const View = ()=> {
    const router = useRouter()
    const backHandler = () => {
        router.replace('/indemnity')
    }

    const [indemnity, setIndemnity] = useState<any>(null)


    const getIndemnity = async () => {
        try {
            const res = await axios.get('/indemnity/me')
            setIndemnity({
                imei: res.data.imei,
                motive: res.data.motive,
                value: res.data.value
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getIndemnity()
    }, [])


    return (
        <>
            <Head>
                <title>Coover - Indemnity</title>
            </Head>
            <PageWrapper>
                <>
                    <BackIcon onClick={backHandler} />
                    <StartText>
                        Indenização
                        <br /> Acione seu seguro
                    </StartText>
                    <IndemnityForm view defaultValues={indemnity} />
                </>
            </PageWrapper>
        </>
    )
}

export default RequireAuthentication(View)

