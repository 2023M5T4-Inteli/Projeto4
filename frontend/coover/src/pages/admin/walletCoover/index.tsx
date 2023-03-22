import AdminLoginForm from '@/components/adminLoginForm'
import AdminWrapper from '@/components/adminWrapper'
import Input from '@/components/input'

import {
    AuthBox2,
    LeftContainer2,
    PageContainer,
    RightContainer2,
    CaixaTexto,
    CaixaTexto2,
    CaixaTexto3,

} from '@/styles/pages/admin/auth'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Coover from '../../../assets/images/coover_logo.png'
import { Button } from '@/components/button'
import { useRouter } from 'next/router'
import MetamaskForm2 from '@/components/metamaskFormCoover'
import ConectForm from '@/components/inputWalletCoover'

interface Props { }


const walletCoover: React.FC<Props> = props => {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>Admin - Carteira</title>
            </Head>
            <AdminWrapper title='Sua carteira'
                subtitle='Confira o valor disponível de taxa administrativa para saque.'>
                <AuthBox2>
                    <PageContainer>
                        <LeftContainer2>
                            <CaixaTexto>
                                <h3>Saldo total</h3>
                                <h1>1000000 ETH </h1>
                            </CaixaTexto>

                            <h3>Últimas</h3>
                            <h1>Transações:</h1>
                            <CaixaTexto2>
                                <h3>Ativação do grupo X</h3>
                                <h1> +1000000 ETH </h1>

                            </CaixaTexto2>
                            <CaixaTexto3>
                                <h3>Saque da carteira</h3>
                                <h1>- 1000000 ETH</h1>
                            </CaixaTexto3>
                            <CaixaTexto2>
                                <h3>Ativação do grupo X</h3>
                                <h1> +1000000 ETH </h1>

                            </CaixaTexto2>
                            <CaixaTexto3>
                                <h3>Saque da carteira</h3>
                                <h1>- 1000000 ETH</h1>
                            </CaixaTexto3>
                            <CaixaTexto2>
                                <h3>Ativação do grupo X</h3>
                                <h1> +1000000 ETH </h1>
                            </CaixaTexto2>
                            <CaixaTexto2>
                                <h3>Ativação do grupo X</h3>
                                <h1> +1000000 ETH </h1>

                            </CaixaTexto2>
                            <CaixaTexto3>
                                <h3>Saque da carteira</h3>
                                <h1>- 1000000 ETH</h1>
                            </CaixaTexto3>


                        </LeftContainer2>

                        <RightContainer2>
                            <MetamaskForm2 />
                            <h1>Conecte à carteira Metamask que ativou o contrato para realizar a transferência</h1>
                            <h3>Insira o valor</h3>
                            <ConectForm />



                        </RightContainer2>

                    </PageContainer>
                </AuthBox2>
            </AdminWrapper>
        </>
    )
}



export default walletCoover
