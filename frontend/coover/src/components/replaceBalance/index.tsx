import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Button } from '../button'
import Input from '../input'
import { Form } from './style'

const schema = yup.object().shape({
    value: yup
        .number()
        .typeError('O valor deve ser um número')
        .required('O valor é um campo obrigatório')
})

interface Props {}

const ReplaceBalance: React.FC<Props> = props => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
        console.log(data)

        // Conectar função do smart contract aqui
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <p>Repor reserva</p>
            <Input
                label="Valor"
                name="value"
                register={register}
                placeholder="Insira o valor que deseja repor"
                error={errors["value"]}
            />
            <Button type='submit'  >
                Repor
            </Button>
        </Form>
    )
}

export default ReplaceBalance
