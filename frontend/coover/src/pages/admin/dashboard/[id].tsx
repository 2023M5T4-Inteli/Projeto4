import AdminWrapper from '@/components/adminWrapper'
import Head from 'next/head'
import React from 'react'
import { useRouter } from 'next/router'
import ViewInfo from '@/components/viewInfo'
import Title3 from '@/components/title3'
import { Button } from '@/components/button'

const AdminViewGroups = () => {
    const router = useRouter()
    const { id, message, group, min, max, total } = router.query
    console.log(id);
    return (
        <>
            <Head>
                <title>Admin - Novo contrato</title>
            </Head>
            <AdminWrapper title={`Grupo #${group}`} subtitle="Aprove a ativação do contrato" >
                <>
                    <Title3>Requisitos do Grupo</Title3>
                    <ViewInfo label={'Taxa administrativa:'} value={"10%"} />
                    <ViewInfo label={'Valor mínimo do celular:'} value={'R$ 3000,00'} />
                    <ViewInfo label={'Mínimo de pessoas:'} value={`${min}`} />
                    <ViewInfo label={'Máximo de pessoas:'} value={`${max}`} />
                    <ViewInfo label={'Valor da reserva:'} value={'5%'} />

                    <Title3>Status do grupo:</Title3>
                    <ViewInfo label={'Convites aceitos:'} value={`${total}`} />
                    <ViewInfo label={'Convites enviados: 100:'} value={'100'} />
                    <Button>Ativar</Button>
                </>
            </AdminWrapper>
        </>
    )
}

export default AdminViewGroups

