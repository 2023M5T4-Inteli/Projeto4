import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../button'
import Input from '../input'
import { RightIcon } from '../rightIcon'
import { ButtonContainer, Form, Grid } from './style'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Warning from '../warning'
import axios from '../../../axios'
import RequireAuthentication from '@/HOC/requireAuthentication'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

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
    lmiTax: yup
        .number()
        .typeError('Esse campo deve ser um número')
        .required('O valor da taxa é um campo obrigatório')
})


const NewContractForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })
    const router = useRouter()

    const onSubmit = async (data: any) => {
        try{
            await axios.post('/insurance/admin/create', data)
            router.replace('/admin/groups')
        }catch(err:any){
            toast.error(err.response.data)
        }
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
                    name="lmiTax"
                    label="Taxa de limite máximo indenizável *"
                    error={errors['lmiTax']}
                />
            </Grid>

            <Warning
                title="Esse formulário inicia a criação de um novo contrato para grupo mútuo."
                description="Após clicar em “Convidar”, os usuários que atenderem às especificações acima receberão um convite. O contrato estará com o status 'Inativo' até sua ativação ser concluída na Ação 'Ver contrato'."
            />
            <ButtonContainer>
                <Button type='submit'>Criar</Button>
            </ButtonContainer>
        </Form>
    )
}

export default NewContractForm
