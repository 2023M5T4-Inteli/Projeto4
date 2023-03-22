import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../button'
import Input from '../input'
import { RightIcon } from '../rightIcon'
import { ButtonContainer, Form, Grid } from './style'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Warning from '../warning'

const schema = yup.object().shape({
    transfer: yup
        .number()
        .typeError('Esse campo deve ser um número')
        .required('Campo obrigatório'),
})


const ConectForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: any) => {
        // Fazer requisição para backend aqui
    }

    return (

        <Form onSubmit={handleSubmit(onSubmit)}>
            <Grid>
                <Input
                    register={register}
                    name="Transferência"
                    error={errors['transfer']}
                />
            </Grid>
            <Button>Confirmar</Button>
        </Form>

    )
}

export default ConectForm
