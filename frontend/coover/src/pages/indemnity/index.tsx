import { Button } from '@/components/button'
import IndemnityBox from '@/components/indemnityBox'
import PageWrapper from '@/components/pageWrapper'
import { RightIcon } from '@/components/rightIcon'
import { StartText } from '@/components/startText'
import { Content, NoIndemnity } from '@/styles/pages/indemnity'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

export enum IndemnityStatus {
    requested,
    analysis,
    accepted,
    denied
}

export interface IndemnityInterface {
    id: string
    status: IndemnityStatus
}

export default function Indemnity() {
    const router = useRouter()
    const [indemnity, setIndemnity] = useState<IndemnityInterface | null>({
        id: "0",
        status: IndemnityStatus.denied
    })

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
                                    IndemnityStatus.requested &&
                                    indemnity.status !=
                                        IndemnityStatus.analysis && (
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
