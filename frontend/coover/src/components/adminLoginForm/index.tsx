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
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai'

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

interface Props { }

const AdminLoginForm: React.FC<Props> = ({ }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const { setUser } = useUser()

    const onSubmit = (data: any) => {
        // Fazer requisição para backend aqui
        // setUser(user)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                outline
                register={register}
                name="email"
                label="Seu endereço de email *"
                error={errors['email']}
                type="email"
                Icon={AiOutlineMail}
            />
            <Input
                outline
                register={register}
                name="password"
                label="Senha *"
                type="password"
                error={errors['password']}
                Icon={AiOutlineLock}
            />
            <Button marginTop>
                Continuar
            </Button>
        </Form>
    )
}

export default AdminLoginForm
