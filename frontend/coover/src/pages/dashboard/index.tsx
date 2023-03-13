import Notification from '@/components/notification'
import { NoNotification } from '@/components/notification/style'
import PageWrapper from '@/components/pageWrapper'
import { StartText } from '@/components/startText'
import Head from 'next/head'

const notifications = [
    {
        id: 0,
        message: 'Eba! Você foi convidado para participar de um grupo'
    },
    {
        id: 1,
        message: 'Eba! Você foi convidado para participar de um grupo'
    },
    {
        id: 2,
        message: 'Eba! Você foi convidado para participar de um grupo'
    }
]

const Dashboard = () => {
    return (
        <>
            <Head>
                <title>Coover - Dashboard</title>
            </Head>
            <PageWrapper>
                <>
                    <StartText>
                        Olá!
                        <br /> Vamos começar?
                    </StartText>
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
                </>
            </PageWrapper>
        </>
    )
}

export default Dashboard