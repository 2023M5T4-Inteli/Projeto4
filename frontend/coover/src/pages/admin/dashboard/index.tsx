import AdminWrapper from '@/components/adminWrapper'
import Head from 'next/head'
//import React, {useState} from 'react'
import { useRouter } from 'next/router'
import Title from '@/components/title'
import Notification from '@/components/updates'
import { NoNotification } from '@/components/updates/style'
import Status from '@/components/status'

const notifications = [
    {
        id: 0,
        message: 'Novo pedido de indenização!',
        page: '/admin/indemnity/'
    },
    {
        id: 1,
        message: 'Transferência de indenização concluída',
        page: '/admin/indemnity/'
    },
    {
        id: 2,
        message: 'Erro na indenização: IMEI não correspondente',
        page: '/admin/indemnity/'
    },
    {
        id: 3,
        message: 'Erro na indenização: IMEI não correspondente',
        page: '/admin/indemnity/'
    },
]

const status = [
    {
        _id: 0,
        id: 0,
        message: 'Número mínimo atingido!',
        group: 'FVCIACOA',
        min: 40,
        max: 80,
        total: 40,
        page: '/admin/groups/'
    },
    {
        _id: 1,
        id: 1,
        message: 'Número máximo atingido!',
        group: 'FVCIACOB',
        min: 40,
        max: 80,
        total: 80,
        page: '/admin/groups/'
    },
    {
        _id: 2,
        id: 2,
        message: 'Ainda sem participantes',
        group: 'FVCIACOA',
        min: 40,
        max: 80,
        total: 0,
        page: '/admin/groups/'
    },
    {
        _id: 3,
        id: 3,
        message: 'Ainda sem participantes',
        group: 'FVCIACOA',
        min: 40,
        max: 80,
        total: 0,
        page: '/admin/groups/'
    },{
        _id: 4,
        id: 4,
        message: 'Ainda sem participantes',
        group: 'FVCIACOA',
        min: 40,
        max: 80,
        total: 0,
        page: '/admin/groups/'
    }
]

interface Props { }


const AdminDashboard: React.FC<Props> = props => {
    //const [showComponent, setShowComponent] = useState(false);
    const router = useRouter()
    return (
        <>
            <Head>
                <title>Admin - Dashboard</title>
            </Head>
            <AdminWrapper title='Dashboard'>
                <>
                    <Title text="Atualizações"/>
                    {notifications.length > 0 ? (
                        notifications.map(notification => (
                            <Notification key={notification.id} {...notification} />
                        ))
                    ) : (
                        <NoNotification>
                            Nosso sistema já está a procura de um grupo para
                            você entrar. Em breve você receberá um convite.
                        </NoNotification>
                    )}
                    <Title text="Status do grupo"/>
                    {status.length > 0 ? (
                        status.map(status => (
                            <Status key={status.id} {...status} />
                        ))
                    ) : (
                        <NoNotification>
                            Nosso sistema já está a procura de um grupo para
                            você entrar. Em breve você receberá um convite.
                        </NoNotification>
                    )}
                </>
            </AdminWrapper>
        </>
    )
}

export default AdminDashboard
/*
return (
    <>
        <Head>
            <title>Admin - Dashboard</title>
        </Head>
        <AdminWrapper title='Dashboard'
            subtitle='Ainda não há nenhum grupo ativo!'>

            <Button onClick={() => router.push('/admin/contract/new')}>Criar grupo!</Button>

        </AdminWrapper>
    </>
)
*/