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

interface Props {}

const walletCoover: React.FC<Props> = props => {
    const router = useRouter()
    const { account } = useMetamask()
    const [insurance, setInsurance] = useState<any>(null)

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
        formState: { errors }
    } = useForm()
    const onSubmit = (data: any) => console.log(data)
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
                                <MetamaskForm2 />

                                <form>
                                    <Input
                                        label="Valor"
                                        name="value"
                                        register={register}
                                        placeholder="Insira o valor em Ethers que deseja sacar"
                                    />
                                    <Button disabled={account == null}>
                                        {account == null
                                            ? 'Clique na imagem'
                                            : 'Sacar'}
                                    </Button>
                                </form>
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

export default walletCoover
