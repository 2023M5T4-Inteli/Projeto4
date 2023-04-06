import AdminWrapper from '@/components/adminWrapper'
import Head from 'next/head'
import React, {useEffect} from 'react'
import ViewInfo from '@/components/viewInfo'
import { Content } from '@/styles/pages/account'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '@/components/button'
import axios from '../../../../axios'

interface Props {}

const AdminViewGroups: React.FC<Props> = () => {
    const [isAccepted, setIsAccepted] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const [group, setGroup] = useState<any>(null)

    //funcão para buscar informações do pedido de indenização de acordo com id
    const getIndemnity = async () => {
        try {
            const res = await axios.get('/admin/:id')
            //o estado da indenização é definido 
            setIsAccepted(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    //chamada da função
    useEffect(() => {
        getIndemnity()
    }, [])

    const handleAccept = () => {
        setShowConfirmModal(true)
    }

    const confirmHandler = () => {
        setLoading(true)
        // Colocar a requisição para o backend aqui

        setShowConfirmModal(false)
        setIsAccepted(true)
        toast.success('Pedido recusado!')
        setLoading(false)
    }

    
    return (
        <>
            <Head>
                <title>Admin - Novo contrato</title>
            </Head>
            <AdminWrapper
                title="Pedido de Indenização"
                subtitle="Informações do Sinistro"
            >
                <>
                    <Content>
                        <ViewInfo label={'Motivo:'} value={'Furto'} />
                        <ViewInfo label={'IMEI do celular:'} value={'VCW7329YRFBIFB'} />
                        <ViewInfo label={'Endereço da carteira:'} value={'AjsonJGddF12Jjonv'} />
                        <ViewInfo label={'Valor requisitado:'} value={'R$ 3000,00'} />
                        <ViewInfo label={'Valor de reserva disponível:'} value={'R$ 4500,00'} />
                        <ViewInfo label={'Valor da franquia:'} value={'R$ 10000,00'} />
                    </Content>
                    <br></br>
                    

                    <Button style={{display: "inline"}}>Aprovar</Button>
                    <Button  style={{backgroundColor: "#bc1515", display: "inline", marginLeft: "20px"}}>Recusar</Button>
                </>
            </AdminWrapper>
        </>
    )
}

export default AdminViewGroups

/*
{!isAccepted ? (
    <Button style={{display: "inline"}} onClick={handleAccept}>Aprovar</Button>
    ):  <Button inline disabled>Aprovado</Button>}
    {!isAccepted ? (
    <Button  style={{backgroundColor: "#bc1515", display: "inline", marginLeft: "20px"}} onClick={handleAccept}>Recusar</Button>
    ):  <Button style={{marginLeft: "20px"}} inline disabled>Recusado</Button>}

    <ConfirmModal
                title="Você quer aceitar o pedido?"
                show={showConfirmfaModal}
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