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

    //função para recuperar o dados da indenização
    const getIndemnity = async () => {
        try {
            //requisição que retorna informações sobre a indenização associada ao usuário autenticado
            const res = await axios.get('/indemnity/me')
            //informações recuperadas são: imei do celular, motivo da solicitação e o valor solicitado
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

