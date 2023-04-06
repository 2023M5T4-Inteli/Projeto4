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
import React, { useState, useEffect } from 'react'
import axios from '../../../axios'
import { useMetamask } from '@/contexts/metamask'
import { useRouter } from 'next/router'
import { SeguroMutuo } from '../../../ethers'
import { ethers } from 'ethers'
import Loader from '@/components/loader'

const Wallet = () => {
    const { user } = useUser()
    const [balance, setBalance] = useState<any>(null)
    const { account, setAccount } = useMetamask() //Definição do hook useMetamask, que recupera o estado da account
    const router = useRouter() //Hook para manipular a navegação
    const { setUser } = useUser()
    const [loading, setLoading] = useState(true)

    //Função para se conectar a metamask
    const connectToMetamask = async () => {
        if (window.ethereum) {
            if (user) {
                //Se conecta a carteira através do método abaixo e define o estado da account
                try {
                    const res = await window.ethereum.request({
                        method: 'eth_requestAccounts'
                    })

                    setAccount(res[0])
                    const sepolia = '0xaa36a7'
                    if (window.ethereum.chainId !== sepolia) {
                        await window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: sepolia }]
                        })
                    }
                    const contractInstance = await SeguroMutuo(
                        user.insurance.address
                    )

                    const userBalance = await contractInstance.viewUserBalance()

                    const formatedBalance = ethers.utils.formatEther(
                        userBalance.toString()
                    )
                    setBalance(formatedBalance)
                    //Caso haja algum erro
                } catch (err) {
                    console.error(err)
                }
            }

            //Caso não tenha a metamask instalada
        } else {
            alert('Install MetaMask')
        }

        setLoading(false)
    }

    useEffect(() => {
        if (user) {
            connectToMetamask()
        }
    }, [user])

    return (
        <>
            <Head>
                <title>Coover - Wallet</title>
            </Head>
            <PageWrapper>
                <>
                    {user && !user.insuranceActive ? (
                        <FirstPayment />
                    ) : loading ? <Loader /> : (
                        <>
                            <StartText>
                                Sua carteira
                                <br /> Confira o saldo de sua reserva
                            </StartText>
                            <ViewInfo
                                label={'Saldo:'}
                                value={balance + ' ETH'}
                            />

                            <ReplaceBalance getUserBalance={connectToMetamask} />
                        </>
                    )}
                </>
            </PageWrapper>
        </>
    )
}

export default RequireAuthentication(Wallet)
