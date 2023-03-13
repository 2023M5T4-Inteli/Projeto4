import { BackIcon } from '@/components/backIcon'
import IndemnityForm from '@/components/indemnityForm'
import PageWrapper from '@/components/pageWrapper'
import { StartText } from '@/components/startText'
import Head from 'next/head'
import { useRouter } from 'next/router'

export enum IndemnityStatus {
    requested,
    analysis,
    accepted,
    denied
}

interface IndemnityInterface {
    status: IndemnityStatus
}

const formValues = {
    imei: "4891748931",
    confirmImei: "4891748931",
    motive: "Fui roubada"
}

export default function View() {
    const router = useRouter()
    const backHandler = () => {
        router.replace('/indemnity')
    }

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
                    <IndemnityForm view defaultValues={formValues} status="Em análise"/>
                </>
            </PageWrapper>
        </>
    )
}
