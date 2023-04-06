import RequireAuthentication from '@/HOC/requireAuthentication'
import PageWrapper from '@/components/pageWrapper'
import ReplaceBalance from '@/components/replaceBalance'
import { StartText } from '@/components/startText'
import ViewInfo from '@/components/viewInfo'
import Warning from '@/components/warning'
import { useUser } from '@/contexts/user'
import Head from 'next/head'
import Image from 'next/image'
import FirstPayment from '@/components/firstPayment'
import React, {useState, useEffect} from 'react'
import axios from '../../../axios'

const Wallet = () => {
    const { user } = useUser()
    const [balance, setBalance] = useState(0)

    const getUserBalance =  () => {
        axios.get('/users/userBalance').then(res => setBalance(res.data)).catch(err => console.log(err))

    }

    useEffect(() => {
        getUserBalance()
    }, [])
    

    return (
        <>
            <Head>
                <title>Coover - Wallet</title>
            </Head>
            <PageWrapper>
                <>
                    {user && !user.insuranceActive ? (
                        <FirstPayment />
                    ) : (
                        <>
                            <StartText>
                                Sua carteira
                                <br /> Confira o saldo de sua reserva
                            </StartText>
                            <ViewInfo label={'Saldo:'} value={balance+" ETH"} />

                            <ReplaceBalance getUserBalance={getUserBalance} />
                        </>
                    )}
                </>
            </PageWrapper>
        </>
    )
}

export default RequireAuthentication(Wallet)
