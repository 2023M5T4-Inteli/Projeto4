import AdminLoginForm from '@/components/adminLoginForm'
import AdminWrapper from '@/components/adminWrapper'
import Input from '@/components/input'
import NewContractForm from '@/components/newContractForm'
import Warning from '@/components/warning'
import {
    AuthBox,
    LeftContainer,
    PageContainer,
    RightContainer
} from '@/styles/pages/admin/auth'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Coover from '../../../assets/images/coover_logo.png'

interface Props { }

const NewContract: React.FC<Props> = props => {
    return (
        <>
            <Head>
                <title>Admin - Novo contrato</title>
            </Head>
            <AdminWrapper
                title="Novo contrato"
                subtitle="Preencha as informações abaixo para iniciar um novo grupo mútuo contra roubo e furto de celular."
            >
                <NewContractForm />
            </AdminWrapper>
        </>
    )
}

export default NewContract
