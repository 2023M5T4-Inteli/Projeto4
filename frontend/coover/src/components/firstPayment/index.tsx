import React, { useState } from 'react'
import { Form } from './style'
import { StartText } from '../startText'
import Image from 'next/image'
import MetamaskLogo from '../../assets/images/metamask.png'
import { useRouter } from 'next/router'
import { useUser } from '@/contexts/user'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import axios from '../../../axios'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import Input from '../input'
import { Button } from '../button'
import { useMetamask } from '@/contexts/metamask'
import { SeguroMutuo } from '../../../ethers'
import { ethers } from 'ethers'
import Loader from '../loader'

const schema = yup.object().shape({
    value: yup.number().required('O valor é um campo obrigatório')
})

const FirstPayment = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { user, setUser } = useUser()
    const { account, setAccount } = useMetamask()

    //Função para se conectar a metamask
    const connectToMetamask = async () => {
        if (window.ethereum) {
            //Se conecta a carteira através do método abaixo e define o estado da account
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

            //Caso não tenha a metamask instalada
        } else {
            alert('Install MetaMask')
        }
    }

    const onSubmit = async (data: any) => {
        setLoading(true)
        try {
            if (account !== user?.wallet) {
                toast.error('Conecte ao mesmo endereço do cadastrado!')
                return
            }
            const contractInstance = await SeguroMutuo(user!.insurance.address)
            const formatedValue = ethers.utils.parseUnits(
                data.value.toString(),
                'ether'
            )
            const tx = await contractInstance.firstPayment({
                value: formatedValue
            })
            await tx.wait()
            const res = await axios.patch('/users/insuranceActive')
            toast.success('Primeiro pagamento realizado com sucesso!')
            router.reload()
        } catch (err: any) {
            toast.error('Erro ao realizar o primeiro pagamento!')
        }
        setLoading(false)
    }

    if (loading) {
        return <Loader />
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <StartText>
                Carteira
                <br /> Realize o primeiro pagamento
            </StartText>
            <span>
                Para ativar sua franquia, faça o primeiro pagamento de sua
                reserva.
            </span>

            <Image
                onClick={connectToMetamask}
                src={MetamaskLogo}
                alt="Metamask Logo"
            />
            {account ? (
                <span>Endereço conectado: {account}</span>
            ) : (
                <span>
                    Conecte à carteira Metamask que foi adicionada ao grupo para
                    ativar sua franquia
                </span>
            )}
            <Input
                name="value"
                register={register}
                label="Valor do pagamento inicial"
                error={errors['value']}
            />

            <Button disabled={account == null}>Pagar</Button>
        </Form>
    )
}

export default FirstPayment
