import { BackIcon } from '@/components/backIcon'
import { Button } from '@/components/button'
import Header from '@/components/header'
import MetamaskForm from '@/components/metamaskForm'
import SignupForm from '@/components/signupForm'
import { PageContainer, Title } from '@/styles/pages/signup'
import { yupResolver } from '@hookform/resolvers/yup'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'


const schema = yup.object().shape({
    email: yup
        .string()
        .email('Insira um email válido')
        .required('O email é um campo obrigatório'),
    password: yup
        .string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .max(32, 'A senha deve ter no máximo 32 caracteres')
        .required('A senha é um campo obrigatório'),
    confirmPassword: yup
        .string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .max(32, 'A senha deve ter no máximo 32 caracteres')
        .required('A confirmação de senha é um campo obrigatório'),
    imei: yup.string().required('O imei é um campo obrigatório'),
    confirmImei: yup
        .string()
        .required('A confirmação do imei é um campo obrigatório'),
    phoneModel: yup
        .string()
        .required('O modelo do celular é um campo obrigatório'),
    phoneValue: yup
        .number().typeError("O valor do celular deve ser um número")
        .required('O valor do celular é um campo obrigatório')
})

export default function Signup() {
    const [stage, setStage] = useState(0)
    const router = useRouter()

    const backHandler = () => {
        if (stage == 0) {
            router.replace("/")
        } else if (stage == 1) {
            setStage(0)
        }
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    return (
        <>
            <Head>
                <title>Coover - Criar conta</title>
            </Head>
            <Header />
            <BackIcon onClick={backHandler}/>
            <Title>Proteja seu smartphone contra tudo, onde estiver</Title>

            <PageContainer stage={stage}>
                <SignupForm errors={errors} handleSubmit={handleSubmit} register={register} setStage={setStage} />
                <MetamaskForm watch={watch}/>
            </PageContainer>
        </>
    )
}
