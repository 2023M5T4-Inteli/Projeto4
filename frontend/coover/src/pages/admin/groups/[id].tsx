import AdminWrapper from '@/components/adminWrapper'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ViewInfo from '@/components/viewInfo'
import {} from '@/components/button'
import { Button } from '@/components/button'
import { Container, ButtonContainer } from '../../../styles/pages/admin/groups'
import axios from '../../../../axios'
import { toast } from 'react-toastify'
import Loader from '@/components/loader'
import ConfirmModal from '@/components/confirmModal'

const AdminViewGroups = () => {
    const router = useRouter()
    const [group, setGroup] = useState<any>(null)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [loading, setLoading] = useState(false)

    //função para ver um único grupo (através do id)
    const getGroup = async () => {
        try {
            const res = await axios.get('/insurance/admin/' + router.query.id)
            setGroup(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (router.isReady) {
            getGroup()
        }
    }, [router.isReady])

    //função para aprovação de um seguro
    const approveGroup = async () => {
        setLoading(true)
        try {
            const res = await axios.get('/insurance/admin/approve/' + group._id)
            toast.success('Grupo ativado com sucesso!')
            router.replace('/admin/groups')
        } catch (err: any) {
            toast.error(err.response.data)
        }
        setShowConfirmModal(false)
        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Admin - Novo contrato</title>
            </Head>
            <AdminWrapper
                title={`Grupo #${group ? group._id : '...'}`}
                subtitle="Veja mais informações sobre esse grupo"
            >
                {group ? (
                    <>
                        <Container>
                            <ViewInfo
                                label={'Balanço total do contrato:'}
                                value={'R$' + group.contractBalance}
                            />
                            <ViewInfo
                                label={'Status:'}
                                value={group.status ? 'Ativo' : 'Inativo'}
                            />
                            <ViewInfo
                                label={'Número de participantes:'}
                                value={group.users.length?.toString()}
                            />
                            <ViewInfo
                                label={'Valor mínimo do celular:'}
                                value={'R$' + group.minPhoneValue}
                            />
                            <ViewInfo
                                label={'Taxa LMI:'}
                                value={group.lmiTax + '%'}
                            />
                            <ViewInfo
                                label={'Taxa administrativa:'}
                                value={group.adminTax + '%'}
                            />
                            {!group.isActive && (
                                <>
                                    <ViewInfo
                                        label={
                                            'Número mínimo de participantes:'
                                        }
                                        value={group.minPeople}
                                    />
                                    <ViewInfo
                                        label={
                                            'Número máximo de participantes:'
                                        }
                                        value={group.maxPeople}
                                    />
                                    <ViewInfo
                                        label={'Data de expiração:'}
                                        date
                                        value={group.expirationDate}
                                    />
                                </>
                            )}
                        </Container>

                        {!group.isActive && (
                            <>
                                <ButtonContainer>
                                    <Button onClick={() => setShowConfirmModal(true)}>
                                        Ativar
                                    </Button>
                                </ButtonContainer>
                                <ConfirmModal loading={loading} confirmHandler={approveGroup} title='Tem certeza que deseja ativar o grupo?' obs='Essa ação é irreversível.' show={showConfirmModal} closeModal={() => setShowConfirmModal(false)} />
                            </>
                        )}
                    </>
                ) : (
                    <Loader />
                )}
            </AdminWrapper>
        </>
    )
}

export default AdminViewGroups
