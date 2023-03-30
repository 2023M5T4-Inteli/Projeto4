import AdminWrapper from '@/components/adminWrapper'
import Head from 'next/head'
import React from 'react'

interface Props {
    id: number
    message: string
    group: string
    min: number
    max: number
    total: number
}

const AdminViewGroups: React.FC<Props> = ({ id, message, group, min, max, total }) => {
    return (
        <>
            <Head>
                <title>Admin - Novo contrato</title>
            </Head>
            <AdminWrapper
                title= {group}
                subtitle="Aprove a ativação do contrato"
            >
                <>
                    <h1>{min}</h1>
                </>
            </AdminWrapper>
        </>
    )
}

export default AdminViewGroups

