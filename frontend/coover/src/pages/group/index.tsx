import PageWrapper from '@/components/pageWrapper'
import ReplaceBalance from '@/components/replaceBalance'
import { StartText } from '@/components/startText'
import ViewInfo from '@/components/viewInfo'
import Warning from '@/components/warning'
import { Content, Status } from '@/styles/pages/group'
import Head from 'next/head'

export default function Group() {
    return (
        <>
            <Head>
                <title>Coover - Group</title>
            </Head>
            <PageWrapper>
                <>
                    <StartText>
                        Grupo
                        <br /> Veja as informações do seu grupo
                    </StartText>
                    <Content>
                        <Status>Status: <span>ativo</span></Status>
                        <ViewInfo label={'Saldo do grupo:'} value="R$0,00" />
                        <ViewInfo label={'Número de participantes:'} value="100" />
                        <ViewInfo label={'Coberturas:'} value="Roubo e furto" />
                        <ViewInfo label={'Franquia:'} value="X%" />
                        <ViewInfo label={'Vigência:'} value="12 meses restantes" />
                    </Content>
                   

                    {/* <Warning />
                    <ReplaceBalance /> */}
                </>
            </PageWrapper>
        </>
    )
}
