import React, { useState } from 'react'
import ViewInfo from '../viewInfo'
import { ButtonContainer, Content } from './style'
import { Button } from '../button'
import { Indemnity } from '@/pages/admin/indemnity/[id]'
import axios from '../../../axios'
import { toast } from 'react-toastify'
import Loader from '../loader'

interface Props {
    indemnity: Indemnity
    setIndemnity(value: any): void
    getIndemnity(): Promise<void>
}

const IndemnityAnalysis: React.FC<Props> = ({ indemnity, setIndemnity, getIndemnity }) => {
    const [loading, setLoading] = useState(false)

    const denyHandler = async () => {
        setLoading(true)
        try {
            await axios.patch('/indemnity/admin/deny/' + indemnity._id)
            await getIndemnity()
            toast.success('Indenização recusada com sucesso!')
        } catch (err) {
            toast.error('Não foi possível recusar a indenização!')
        }
        setLoading(false)
    }

    const approveHandler = async () => {
        setLoading(true)
        try {
            await axios.patch('/indemnity/admin/approve/' + indemnity._id)
            await getIndemnity()
            toast.success('Indenização aprovada com sucesso!')
        } catch (err) {
            toast.error('Não foi possível aprovar a indenização!')
        }

        setLoading(false)
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            <Content>
                <ViewInfo label={'Motivo:'} value={indemnity.motive} />
                <ViewInfo label={'IMEI do celular:'} value={indemnity.imei} />
                <ViewInfo
                    label={'Endereço da carteira:'}
                    value={indemnity.user.wallet}
                />
                <ViewInfo
                    label={'Valor requisitado:'}
                    value={indemnity.value + ' ETH'}
                />
            </Content>
            <br></br>

            <ButtonContainer>
                <Button
                    onClick={denyHandler}
                    style={{
                        backgroundColor: '#bc1515',
                        color: 'white',
                        display: 'inline',
                        marginRight: '20px'
                    }}
                >
                    Recusar
                </Button>
                <Button onClick={approveHandler} style={{ display: 'inline' }}>
                    Aprovar
                </Button>
            </ButtonContainer>
        </>
    )
}

export default IndemnityAnalysis
