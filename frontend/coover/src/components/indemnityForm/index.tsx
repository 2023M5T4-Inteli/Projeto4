import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../button'
import Input from '../input'
import { RightIcon } from '../rightIcon'
import { Form } from './style'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
    imei: yup.string().required('O imei é um campo obrigatório'),
    confirmImei: yup
        .string()
        .required('A confirmação do imei é um campo obrigatório'),
    motive: yup.string().required('O motivo é um campo obrigatório')
})

interface Props {
    view?: boolean
    defaultValues?: any
    status?: string
}

const IndemnityForm: React.FC<Props> = ({ view, defaultValues, status }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
        // Fazer requisição para backend aqui
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
            <Input
                register={register}
                name="confirmImei"
                label="Confirme o IMEI do celular *"
                error={errors['confirmImei']}
                disabled={view}
            />
            <Input
                register={register}
                name="motive"
                label="Motivo do sinistro *"
                error={errors['motive']}
                disabled={view}
            />
            {!view && (
                <Input
                    register={register}
                    name="file"
                    type="file"
                    label="Anexe o documento"
                    disabled={view}
                />
            )}

            <Button disabled={view} marginTop>
                {status ? (
                    status
                ) : (
                    <span>
                        Solicitar <RightIcon />
                    </span>
                )}
            </Button>
        </Form>
    )
}

export default IndemnityForm
