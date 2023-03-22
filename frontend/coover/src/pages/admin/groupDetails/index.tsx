import AdminWrapper from '@/components/adminWrapper'
import Head from 'next/head'
import React from 'react'
import { LogoutButton } from '@/components/button'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'

import ConfirmModal from '@/components/popUp/deactivateGroup'




interface Props { }


const AdminDashboard: React.FC<Props> = props => {
    const router = useRouter()

    const [isAccepted, setIsAccepted] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleAccept = () => {
        setShowConfirmModal(true)
    }

    const confirmHandler = () => {
        setLoading(true)
        // Colocar a requisição para o backend aqui

        setShowConfirmModal(false)
        setIsAccepted(true)
        toast.success('Grupo finalizado com sucesso!')
        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Admin - Dashboard</title>
            </Head>
            <AdminWrapper title='Dashboard'
                subtitle='Ainda não há nenhum grupo ativo!'>

                {!isAccepted ? (
                <LogoutButton onClick={handleAccept}>Desativar</LogoutButton>
                ):  <LogoutButton inline disabled>Grupo Inativo</LogoutButton>}
            </AdminWrapper>
            <ConfirmModal
                title="Você confirma o fim do contrato?"
                show={showConfirmModal}
                closeModal={() => setShowConfirmModal(false)}
                confirmHandler={confirmHandler}
                loading={loading}
            />
        </>
    )
}



export default AdminDashboard
