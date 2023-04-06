import AdminWrapper from '@/components/adminWrapper'
import { useForm } from 'react-hook-form'
import {
    AuthBox2,
    LeftContainer2,
    PageContainer,
    RightContainer2,
    CaixaTexto,
    CaixaTexto2,
    CaixaTexto3,
    MetamaskContainer
} from '@/styles/pages/admin/groups/wallet'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Coover from '../../../assets/images/coover_logo.png'
import { Button } from '@/components/button'
import { useRouter } from 'next/router'
import MetamaskForm2 from '@/components/metamaskFormCoover'
import ConectForm from '@/components/inputWalletCoover'
import Input from '@/components/input'
import { useMetamask } from '@/contexts/metamask'
import axios from '../../../../../axios'
import Loader from '@/components/loader'
import { toast } from 'react-toastify'
import { SeguroMutuo } from '../../../../../ethers'
import { ethers } from 'ethers'
import { useUser } from '@/contexts/user'
import RequireAuthentication from '@/HOC/requireAuthentication'

interface Props {}

const walletCoover: React.FC<Props> = props => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { account } = useMetamask()
    const [insurance, setInsurance] = useState<any>(null)
    const { user } = useUser()

    const getContract = async () => {
        try {
            const res = await axios.get('/insurance/admin/' + router.query.id)
            setInsurance(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (router.isReady) {
            getContract()
        }
    }, [router.isReady])

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm()

    const onSubmit = async () => {
        setLoading(true)
        try {
            if (account !== user?.wallet) {
                toast.error('Conecte ao mesmo endereço do cadastrado!')
                return
            }

            const contractInstance = await SeguroMutuo(user!.insurance.address)

            const tx = await contractInstance.adminWithdrawal()
            await tx.wait()
            getContract()
            toast.success('Saque feito com sucesso!')
            reset({ value: '' })
        } catch (err: any) {
            toast.error('Erro ao realizar o saque!')
        }
        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Admin - Carteira</title>
            </Head>
            <AdminWrapper
                title="Sua carteira"
                subtitle="Confira o valor disponível de taxa administrativa para saque."
            >
                <PageContainer>
                    {insurance ? (
                        <>
                            <CaixaTexto>
                                <label>Saldo total:</label>
                                <p>{insurance.adminTaxAmount} ETH </p>
                            </CaixaTexto>

                            <MetamaskContainer>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        <MetamaskForm2 />
                                        <div>
                                            <p>
                                                Clique para sacar toda a taxa
                                                administrativa
                                            </p>
                                            <Button
                                                onClick={onSubmit}
                                                disabled={account == null}
                                            >
                                                {account == null
                                                    ? 'Clique na imagem'
                                                    : 'Sacar'}
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </MetamaskContainer>
                        </>
                    ) : (
                        <Loader />
                    )}
                </PageContainer>
            </AdminWrapper>
        </>
    )
}

export default RequireAuthentication(walletCoover, true)
