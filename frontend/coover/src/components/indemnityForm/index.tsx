import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../button'
import Input from '../input'
import { RightIcon } from '../rightIcon'
import { Form } from './style'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from '../../../axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Loader from '../loader'

const schema = yup.object().shape({
    imei: yup.string().required('O imei é um campo obrigatório'),
    confirmImei: yup
        .string()
        .required('A confirmação do imei é um campo obrigatório'),
    value: yup.number().required('O valor é um campo obrigatório'),
    motive: yup.string().required('O motivo é um campo obrigatório')
})

interface Props {
    view?: boolean
    defaultValues?: any
}

const IndemnityForm: React.FC<Props> = ({ view, defaultValues,  }) => {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        reset(defaultValues)
    }, [defaultValues])

    const router = useRouter()
    const onSubmit = async (data: any) => {
        setLoading(true)
        if (data.imei != data.confirmImei) {
            toast.error("Imeis não coincidem!")
            return
        }

        try {
            await axios.post('/indemnity/create', data)
            toast.success('Pedido de indenização criado com sucesso!')
            router.replace('/indemnity')
        } catch (err: any) {
            console.log(err)
            toast.error(err.response.data)
        }
        setLoading(false)
    }

    if (loading) {
        return <Loader />
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
                register={register}
                name="imei"
                label="IMEI do celular *"
                error={errors['imei']}
                disabled={view}
            />
            {!view && <Input
                register={register}
                name="confirmImei"
                label="Confirme o IMEI do celular *"
                error={errors['confirmImei']}
                disabled={view}
            />}
            <Input
                register={register}
                name="value"
                label="Valor da indenização *"
                error={errors['value']}
                disabled={view}
            />
            <Input
                register={register}
                name="motive"
                label="Motivo do sinistro *"
                error={errors['motive']}
                disabled={view}
            />

            {!view && <Button disabled={view} marginTop>
                <span>
                    Solicitar <RightIcon />
                </span>
            </Button>}
        </Form>
    )
}

export default IndemnityForm
