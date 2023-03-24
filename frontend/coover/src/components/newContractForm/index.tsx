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
    adminTax: yup
        .number()
        .typeError('Esse campo deve ser um número')
        .required('A taxa de administrador é um campo obrigatório'),
    minPhoneValue: yup
        .number()
        .typeError('Esse campo deve ser um número')
        .required('O valor mínimo do celular é um campo obrigatório'),
    minPeople: yup
        .number()
        .typeError('Esse campo deve ser um número')
        .required('A quantidade mínima de pessoas é um campo obrigatório'),
    maxPeople: yup
        .number()
        .typeError('Esse campo deve ser um número')
        .required('A quantidade máxima de pessoas é um campo obrigatório'),
    inviteExpiration: yup
        .date()
        .typeError('Esse campo deve ser uma data')
        .required('O tempo do convite é um campo obrigatório'),
    franchiseValue: yup
        .number()
        .typeError('Esse campo deve ser um número')
        .required('O valor da franquia é um campo obrigatório')
})


const NewContractForm: React.FC = () => {
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
                    name="adminTax"
                    label="Taxa administrativa *"
                    error={errors['adminTax']}
                />
                <Input
                    register={register}
                    name="minPhoneValue"
                    label="Valor mínimo do celular *"
                    error={errors['minPhoneValue']}
                />
                <Input
                    register={register}
                    name="minPeople"
                    label="Mínimo de pessoas *"
                    error={errors['minPeople']}
                />
                <Input
                    register={register}
                    name="maxPeople"
                    label="Máximo de pessoas *"
                    error={errors['maxPeople']}
                />
                <Input
                    register={register}
                    name="inviteExpiration"
                    type="date"
                    label="Tempo do convite *"
                    error={errors['inviteExpiration']}
                />
                <Input
                    register={register}
                    name="franchiseValue"
                    label="Valor da reserva *"
                    error={errors['franchiseValue']}
                />
            </Grid>

            <Warning
                title="Esse formulário inicia a criação de um novo contrato para grupo mútuo."
                description="Após clicar em “Convidar”, os usuários que atenderem às especificações acima receberão um convite. O status do contrato para sua ativação será informado no dashboard."
            />
            <ButtonContainer>
                <Button>Convidar</Button>
            </ButtonContainer>
        </Form>
    )
}

export default NewContractForm
