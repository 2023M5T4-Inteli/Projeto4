import { Button } from '@/components/button'
import IndemnityBox from '@/components/indemnityBox'
import PageWrapper from '@/components/pageWrapper'
import { RightIcon } from '@/components/rightIcon'
import { StartText } from '@/components/startText'
import { Content, NoIndemnity } from '@/styles/pages/indemnity'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from '../../../axios'
import RequireAuthentication from '@/HOC/requireAuthentication'

export enum IndemnityStatus {
    requested,
    accepted,
    denied
}

export interface IndemnityInterface {
    id: string
    status: IndemnityStatus
}

const Indemnity = ()=> {

    const router = useRouter()
    const [indemnity, setIndemnity] = useState<IndemnityInterface | null>(null)

    const getIndemnity = async () => {
        try {
            const res = await axios.get('/indemnity/me')
            let status = IndemnityStatus.requested
            if (!res.data.approved && res.data.isActive){
                status = IndemnityStatus.requested
            } else if (res.data.approved && !res.data.isActive){
                status = IndemnityStatus.accepted
            } else if (!res.data.approved && !res.data.isActive){
                status = IndemnityStatus.denied
            }

            const inden = {
                id: res.data._id,
                status
            }
            setIndemnity(inden)
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
                    <StartText>
                        Indenização
                        <br /> Acione seu seguro
                    </StartText>
                    <Content>
                        {indemnity && (
                            <>
                                <IndemnityBox {...indemnity} />
                                {indemnity.status !=
                                    IndemnityStatus.requested
                                     && (
                                        <Button onClick={() => router.push("/indemnity/new")}>
                                            Solicitar <RightIcon />
                                        </Button>
                                    )}
                            </>
                        )}

                        {!indemnity && (
                            <>
                                <NoIndemnity>
                                    Você ainda não tem nenhuma indenização em
                                    andamento
                                </NoIndemnity>
                                <Button onClick={() => router.push("/indemnity/new")}>
                                    Solicitar <RightIcon />
                                </Button>
                            </>
                        )}
                    </Content>
                </>
            </PageWrapper>
        </>
    )
}

export default RequireAuthentication(Indemnity)

