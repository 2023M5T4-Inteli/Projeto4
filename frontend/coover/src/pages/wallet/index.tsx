import RequireAuthentication from '@/HOC/requireAuthentication'
import { BackIcon } from '@/components/backIcon'
import { Button } from '@/components/button'
import Header from '@/components/header'
import MetamaskForm from '@/components/metamaskForm'
import Notification from '@/components/notification'
import { NoNotification } from '@/components/notification/style'
import PageWrapper from '@/components/pageWrapper'
import ReplaceBalance from '@/components/replaceBalance'
import { StartText } from '@/components/startText'
import ViewInfo from '@/components/viewInfo'
import Warning from '@/components/warning'
import Head from 'next/head'


const Wallet = ()=> {
    return (
        <>
            <Head>
                <title>Coover - Wallet</title>
            </Head>
            <PageWrapper>
                <>
                    <StartText>
                        Sua carteira
                        <br /> Confira o saldo de sua reserva
                    </StartText>
                    <ViewInfo label={"Saldo:"} value="R$0,00" />

                    <Warning title='Saldo menor que o da cobertura!' description='Para aproveitar 100% de cobertura no sinistro, reponha sua reserva.' />
                    <ReplaceBalance />
                </>
            </PageWrapper>
        </>
    )
}

export default RequireAuthentication(Wallet)

