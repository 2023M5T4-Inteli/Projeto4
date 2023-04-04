import { Button } from '@/components/button'
import ConfirmModal from '@/components/confirmModal'
import PageWrapper from '@/components/pageWrapper'
import { StartText } from '@/components/startText'
import ViewInfo from '@/components/viewInfo'
import { Content } from '@/styles/pages/invite/[id]'
import Head from 'next/head'
import { toast } from 'react-toastify'
import axios from '../../../axios'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Loader from '@/components/loader'
import Moment from 'react-moment';
import RequireAuthentication from '@/HOC/requireAuthentication'

const  Wallet =()=> {
    const [isAccepted, setIsAccepted] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleAccept = () => {
        setShowConfirmModal(true)
    }

    const router = useRouter()
    const [invite, setInvite] = useState<any>(null)

    const getInvite = async () => {
        try {
            const res = await axios.get('/insurance/user/invites/' + router.query.id)
            setInvite(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (router.isReady) {
            getInvite()
        }
    }, [router.isReady])

    const confirmHandler = async () => {
        setLoading(true)
        try {
            const res = await axios.patch('/insurance/user/invite', { insurance: router.query.id })

            setIsAccepted(true)
            toast.success('Grupo aceito com sucesso, aguarde a ativação!')
            router.replace('/group')
        } catch (err: any) {
            toast.error(err.response.data)
        }

        setShowConfirmModal(false)
        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Coover - Invite</title>
            </Head>
            <PageWrapper>
                <>
                    <StartText>
                        Seu convite
                        <br /> Confira as informações o grupo
                    </StartText>
                    <Content>
                        {
                            invite ? <> <ViewInfo
                                label={'Preço mínimo do celular:'}
                                value={"R$" + invite.minPhoneValue.toFixed(2)}
                            />
                                <ViewInfo label={'Coberturas:'} value="Roubo e furto" />
                                <ViewInfo
                                    label={'Quantidade mínima de participantes:'}
                                    value={invite.minPeople}
                                />
                                <ViewInfo
                                    label={'Quantidade máxima de participantes:'}
                                    value={invite.maxPeople}
                                />
                                <ViewInfo label={'Taxa de limite máximo indenizável:'} value={invite.lmiTax + "%"} />
                                <ViewInfo label={'Data de expiração:'} date value={invite.inviteExpiration} />
                                <span
                                    onClick={() => {
                                        // Abrir PDF
                                    }}
                                >
                                    Ler condições
                                </span>
                                {!isAccepted ? (
                                    <Button onClick={handleAccept}>Aceitar</Button>
                                ) : <Button inline disabled>Grupo aceito</Button>}</> : <Loader />
                        }

                    </Content>
                </>
            </PageWrapper>
            <ConfirmModal
                title="Tem certeza que deseja aceitar o convite? Para ativá-lo realize o primeiro depósito"
                show={showConfirmModal}
                closeModal={() => setShowConfirmModal(false)}
                confirmHandler={confirmHandler}
                loading={loading}
            />
        </>
    )
}

export default RequireAuthentication(Wallet)
