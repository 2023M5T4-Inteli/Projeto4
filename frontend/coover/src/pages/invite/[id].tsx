import { Button } from '@/components/button'
import ConfirmModal from '@/components/confirmModal'
import PageWrapper from '@/components/pageWrapper'
import { StartText } from '@/components/startText'
import ViewInfo from '@/components/viewInfo'
import { Content } from '@/styles/pages/invite/[id]'
import Head from 'next/head'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function Wallet() {
    const [isAccepted, setIsAccepted] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleAccept = () => {
        setShowConfirmModal(true)
    }

    const confirmHandler = () => {
        setLoading(true)
        // Colocar a requisição para o backend aqui

        setShowConfirmModal(false)
        setIsAccepted(true)
        toast.success('Grupo aceito com sucesso, aguarde a ativação!')
        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Coover - Invite</title>
            </Head>
            <PageWrapper>
                <>
                    <StartText>
                        Seu convite
                        <br /> Confira as informações o grupo
                    </StartText>
                    <Content>
                        <ViewInfo
                            label={'Preço mínimo do celular:'}
                            value="R$3000,00"
                        />
                        <ViewInfo label={'Coberturas:'} value="Roubo e furto" />
                        <ViewInfo
                            label={'Quantidade mínima de participantes:'}
                            value="30"
                        />
                        <ViewInfo
                            label={'Quantidade mínima de participantes:'}
                            value="50"
                        />
                        <ViewInfo label={'Franquia:'} value="R$0,00" />
                        <ViewInfo label={'Vigência:'} value="R$0,00" />
                        <ViewInfo label={'Dias restantes:'} value="5" />
                        <span
                            onClick={() => {
                                // Abrir PDF
                            }}
                        >
                            Ler condições
                        </span>
                        {!isAccepted ? (
                            <Button onClick={handleAccept}>Aceitar</Button>
                        ):  <Button inline disabled>Grupo aceitado</Button>}
                    </Content>
                </>
            </PageWrapper>
            <ConfirmModal
                title="Tem certeza que deseja aceitar o convite?"
                show={showConfirmModal}
                closeModal={() => setShowConfirmModal(false)}
                confirmHandler={confirmHandler}
                loading={loading}
            />
        </>
    )
}
