import Notification from '@/components/notification'
import { NoNotification } from '@/components/notification/style'
import PageWrapper from '@/components/pageWrapper'
import { StartText } from '@/components/startText'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import axios from '../../../axios'
import RequireAuthentication from '@/HOC/requireAuthentication'

// const notifications = [
//     {
//         id: 0,
//         message: 'Eba! Você foi convidado para participar de um grupo'
//     },
//     {
//         id: 1,
//         message: 'Eba! Você foi convidado para participar de um grupo'
//     },
//     {
//         id: 2,
//         message: 'Eba! Você foi convidado para participar de um grupo'
//     },
//     {
//         id: 3,
//         message: 'Realize um depósito para concluir sua participação'
//     }
// ]

const Dashboard = () => {
    const [notifications, setNotifications] = useState<any>([])

    const getInvites = async () => {
        try {
            const res = await axios.get('/insurance/user/invites')
            setNotifications(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getInvites()
    }, [])

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
                    {notifications && notifications.length > 0 ? (
                        notifications.map((notification: any) => (
                            <Notification key={notification._id} id={notification._id} message='Eba! Você foi convidado para participar de um grupo' />
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

export default RequireAuthentication(Dashboard)