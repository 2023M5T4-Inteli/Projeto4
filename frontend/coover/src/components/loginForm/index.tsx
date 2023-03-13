import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../button'
import Input from '../input'
import { RightIcon } from '../rightIcon'
import { Form } from './style'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
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
    setStage(stage: number): void
}

const LoginForm: React.FC<Props> = ({ setStage }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const {setUser} = useUser()

    const onSubmit = (data: any) => {
        // Fazer requisição para backend aqui
        
        setStage(1)
        // setUser(user)
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

            <Link href="/signup">
                Ainda não tem conta? <br />
                Criar conta
            </Link>
        </Form>
    )
}

export default LoginForm
