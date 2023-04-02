import AdminWrapper from '@/components/adminWrapper'
import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'
import ViewInfo from '@/components/viewInfo'
import {} from '@/components/button'
import { Button } from '@/components/button'

const AdminViewGroups = () => {
    const router = useRouter()
    const { id, status, contractTotalValue, numberPeople } = router.query
    return (
        <>
            <Head>
                <title>Admin - Novo contrato</title>
            </Head>
            <AdminWrapper
                title={`Grupo #${id}`}
                subtitle="Veja mais informações sobre esse grupo"
            >
                <>
                    <ViewInfo label={'Status:'} value={status ? 'Ativo' : 'Inativo'} />
                    <ViewInfo label={'Saldo:'} value={`${contractTotalValue}`} />
                    <ViewInfo label={'Número de participantes:'} value={`${numberPeople}`} />
                    <Button  style={{backgroundColor: "#bc1515", display: "inline", marginLeft: "20px"}}>Desativar</Button>
                </>
            </AdminWrapper>
        </>
    )
}

export default AdminViewGroups
