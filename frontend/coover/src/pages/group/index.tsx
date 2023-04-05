import PageWrapper from '@/components/pageWrapper'
import { StartText } from '@/components/startText'
import ViewInfo from '@/components/viewInfo'
import { Content, Status } from '@/styles/pages/group'
import Head from 'next/head'
import Web3 from 'web3'
import { useState, useEffect } from 'react'
import axios from '../../../axios'
import Loader from '@/components/loader'
import RequireAuthentication from '@/HOC/requireAuthentication'
import { useRouter } from 'next/router'
import { useUser } from '@/contexts/user'
import Link from 'next/link'
import Warning from '@/components/warning'
import { toast } from 'react-toastify'

const Group = () => {
    const router = useRouter()
    const [group, setGroup] = useState<any>(null)
    const { user } = useUser()

    const getGroup = async () => {
        try {
            const res = await axios.get('/insurance/user/me')
            setGroup(res.data)
        } catch (err: any) {
            toast.error(err.response.data)
        }
    }

    useEffect(() => {
        getGroup()
    }, [])

    return (
        <>
            <Head>
                <title>Coover - Group</title>
            </Head>
            <PageWrapper>
                <>
                    <StartText>
                        Grupo
                        <br /> Veja as informações do seu grupo
                    </StartText>
                    <Content>
                        {group ? (
                            <>
                                {!user?.insuranceActive && (
                                    <Warning
                                        title="IMPORTANTE"
                                        description="Para ativar as transações do seguro, realize
                                    o primeiro pagamento na página de Fundos"
                                        noMargin
                                    />
                                )}
                                <Status isActive={group.isActive}>
                                    Status:{' '}
                                    <span>
                                        {group.isActive
                                            ? 'Ativo'
                                            : 'Em análise'}
                                    </span>
                                </Status>
                                {/* <ViewInfo label={'Saldo do grupo:'} value="R$0,00" /> */}
                                <ViewInfo
                                    label={'Número de participantes:'}
                                    value={group.users.length}
                                />
                                <ViewInfo
                                    label={'Coberturas:'}
                                    value="Roubo e furto"
                                />
                                <ViewInfo
                                    label={'Taxa máxima de limite indenizável:'}
                                    value={group.lmiTax + '%'}
                                />
                            </>
                        ) : (
                            <p>Você já participa de um grupo</p>
                        )}
                    </Content>

                    {/* <Warning />
                    <ReplaceBalance /> */}
                </>
            </PageWrapper>
        </>
    )
}

export default RequireAuthentication(Group)
