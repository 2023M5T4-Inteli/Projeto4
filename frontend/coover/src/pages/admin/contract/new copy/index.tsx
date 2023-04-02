import AdminWrapper from '@/components/adminWrapper'
import NewContractForm from '@/components/newContractForm'
import Head from 'next/head'
import React from 'react'

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
