import AdminWrapper from '@/components/adminWrapper'
import Head from 'next/head'
import React from 'react'


interface Props {
    id: string
    numberPeople: number
    contractTotalValue: number
    status: boolean
}

const AdminViewGroups: React.FC<Props> = ({ id, numberPeople, contractTotalValue, status }) => {
    return (
        <>
            <Head>
                <title>Admin - Novo contrato</title>
            </Head>
            <AdminWrapper
                title={`Grupos - #4901289`}
                subtitle="Em breve: dados do grupo!"
            >
                <>
                    <h1>{id}</h1>
                    <h1>{numberPeople}</h1>

                </>
            </AdminWrapper>
        </>
    )
}

export default AdminViewGroups
