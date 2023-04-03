import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../button'
import Input from '../input'
import { RightIcon } from '../rightIcon'
import { Form } from './style'
import { toast } from 'react-toastify';
import Link from 'next/link'


interface Props {
    setStage(stage: number): void
    handleSubmit: any
    register: any
    errors: any
}

const SignupForm: React.FC<Props> = ({ setStage,errors,handleSubmit,register }) => {

    const onSubmit = (data: any) => {
        // if (data.password != data.confirmPassword) {
        //     return toast.error("As senhas estão diferentes!")
        // } else if (data.imei != data.confirmImei) {
        //     return toast.error("Os IMEIS estão diferentes!")
        // }

        setStage(1)

    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
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
            <Input
                register={register}
                name="confirmPassword"
                type="password"
                label="Confirme sua senha *"
                error={errors['confirmPassword']}
            />
            <Input
                register={register}
                name="imei"
                label="IMEI do celular *"
                error={errors['imei']}
            />
            <Input
                register={register}
                name="confirmImei"
                label="Confirme seu IMEI *"
                error={errors['confirmImei']}
            />
            <Input
                register={register}
                name="phoneModel"
                label="Modelo do celular *"
                error={errors['phoneModel']}
            />
            <Input
                register={register}
                name="phoneValue"
                label="Valor do aparelho *"
                error={errors['phoneValue']}
            />

            <Button marginTop>
                Continuar <RightIcon />
            </Button>

            <Link href="/login">
                Já tem conta? <br />
                Login
            </Link>
        </Form>
    )
}

export default SignupForm
