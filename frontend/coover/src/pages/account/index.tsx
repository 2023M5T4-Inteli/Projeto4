import { BackIcon } from '@/components/backIcon'
import { Button, LogoutButton } from '@/components/button'
import Header from '@/components/header'
import MetamaskForm from '@/components/metamaskForm'
import Notification from '@/components/notification'
import { NoNotification } from '@/components/notification/style'
import PageWrapper from '@/components/pageWrapper'
import SignupForm from '@/components/signupForm'
import { StartText } from '@/components/startText'
import ViewInfo from '@/components/viewInfo'
import { useUser } from '@/contexts/user'
import { Content } from '@/styles/pages/account'
import { PageContainer, Title } from '@/styles/pages/signup'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { BiLogOutCircle } from 'react-icons/bi'

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

export default function Account() {
    const { user, handleLogout } = useUser()

    return (
        <>
            <Head>
                <title>Coover - Account</title>
            </Head>
            <PageWrapper>
                <>
                    <StartText>
                        Conta!
                        <br /> Suas informações:
                    </StartText>
                    <Content>
                        <ViewInfo label={'Nome:'} value={user?.name} />
                        <ViewInfo label={'Sobrenome:'} value={user?.lastName} />
                        <ViewInfo label={'Email:'} value={user?.email} />
                        <ViewInfo label={'Wallet:'} value={user?.wallet} />
                        <LogoutButton onClick={() => handleLogout("/")}>
                            <span>
                                <BiLogOutCircle /> Logout
                            </span>
                        </LogoutButton>
                    </Content>
                </>
            </PageWrapper>
        </>
    )
}
