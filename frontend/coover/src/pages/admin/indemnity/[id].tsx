import AdminWrapper from '@/components/adminWrapper'
import Head from 'next/head'
import React, { useEffect } from 'react'
import ViewInfo from '@/components/viewInfo'
import { Content } from '@/styles/pages/account'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '@/components/button'
import axios from '../../../../axios'
import { ButtonContainer } from '@/styles/pages/admin/indemnity/[id]'
import { useRouter } from 'next/router'
import IndemnityAnalysis from '@/components/indemnityAnalysis'
import Loader from '@/components/loader'
import { Status } from '@/components/status/style'

interface Props {}

export interface Indemnity {
    _id: string
    user: any
    imei: string
    value: number
    motive: string
    isActive: boolean
    approved: boolean
}

const AdminViewIndemnity: React.FC<Props> = () => {
    const [loading, setLoading] = useState(true)
    const [indemnity, setIndemnity] = useState<Indemnity | null>(null)
    const router = useRouter()

    const getIndemnity = async () => {
        try {
            const res = await axios.get(`/indemnity/admin/${router.query.id}`)
            setIndemnity(res.data)
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (router.isReady) {
            getIndemnity()
        }
    }, [router.isReady])

    return (
        <>
            <Head>
                <title>Admin - Novo contrato</title>
            </Head>
            <AdminWrapper
                title="Pedido de Indenização"
                subtitle="Informações do Sinistro"
            >
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {indemnity && indemnity.isActive && !indemnity.approved && (
                            <IndemnityAnalysis
                                indemnity={indemnity}
                                setIndemnity={setIndemnity}
                                getIndemnity={getIndemnity}
                            />
                        )}
                        {indemnity && !indemnity.isActive && indemnity.approved && <> 
                            {/* <Status isActive ={indemnity.isActive}>
                                    Status:{' '}
                                    <span>
                                        {indemnity.isActive
                                            ? 'Aprovado'
                                            : 'Recusado'}
                                    </span>
                                </Status> */}
                            <ViewInfo
                                    label={'Wallet do usuário:'}
                                    value={indemnity.user.wallet}
                                />
                                <ViewInfo
                                    label={'Imei do celular:'}
                                    value={indemnity.imei}
                                />
                                <ViewInfo
                                    label={'Valor requisitado:'}
                                    value={indemnity.value + 'ETH'}
                                />
                                <ViewInfo
                                    label={'Motivo:'}
                                    value={indemnity.motive}
                                /></>}
                    </>
                )}
            </AdminWrapper>
        </>
    )
}

export default AdminViewIndemnity

/*
{!isAccepted ? (
    <Button style={{display: "inline"}} onClick={handleAccept}>Aprovar</Button>
    ):  <Button inline disabled>Aprovado</Button>}
    {!isAccepted ? (
    <Button  style={{backgroundColor: "#bc1515", display: "inline", marginLeft: "20px"}} onClick={handleAccept}>Recusar</Button>
    ):  <Button style={{marginLeft: "20px"}} inline disabled>Recusado</Button>}

    <ConfirmModal
                title="Você quer aceitar o pedido?"
                show={showConfirmModal}
                closeModal={() => setShowConfirmModal(false)}
                confirmHandler={confirmHandler}
                loading={loading}
            />
            <RefuseModal
                title="Você quer recusar o pedido?"
                show={showConfirmModal}
                closeModal={() => setShowConfirmModal(false)}
                confirmHandler={confirmHandler}
                loading={loading}
            />
*/
