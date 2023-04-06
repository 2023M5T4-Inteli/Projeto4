import React from 'react'
import { Button } from '../button'
import Input from '../input'
import { RightIcon } from '../rightIcon'
import { Form } from './style'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import axios from '../../../axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUser } from '@/contexts/user'

const schema = yup.object().shape({
    email: yup
        .string()
        .email('Insira um email válido')
        .required('O email é um campo obrigatório'),
    password: yup
        .string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .max(32, 'A senha deve ter no máximo 32 caracteres')
        .required('A senha é um campo obrigatório')
})


interface Props {
}

const LoginForm: React.FC<Props> = ({ }) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const router = useRouter()
    const {setUser} = useUser()
    //função para acessar a área privada da aplicação
    const onSubmit = async (data: any) => {
        try{
            const res = await axios.post('/users/login', data)
            setUser(res.data)
            toast.success('Login feito com sucesso!')
            if (!res.data.insurance) {
                router.replace('/dashboard')
            } else {
                router.replace('/group')

            }
        }catch(err:any){
            toast.error(err.response.data)
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                register={register}
                name="email"
                label="Seu endereço de email *"
                error={errors['email']}
                type="email"
            />
            <Input
                register={register}
                name="password"
                label="Senha *"
                type="password"
                error={errors['password']}
            />
            <Button marginTop>
                Login <RightIcon />
            </Button>

            <Link href="/blockchain">
                Ainda não tem conta? <br />
                Criar conta
            </Link>
        </Form>
    )
}

export default LoginForm
