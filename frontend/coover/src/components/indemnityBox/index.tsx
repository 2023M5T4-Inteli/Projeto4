import { IndemnityInterface, IndemnityStatus } from '@/pages/indemnity'
import React from 'react'
import { RightIcon } from '../rightIcon'
import { Container, IndemnityIcon } from './style'
import { AiOutlineRight } from 'react-icons/ai'
import Link from 'next/link'


const IndemnityBox: React.FC<IndemnityInterface> = ({ status, id }) => {
    let text = ''

    switch (status) {
        case IndemnityStatus.requested:
            text = 'Indenização solicitada'
            break
        case IndemnityStatus.analysis:
            text = 'Indenização em análise'
            break
        case IndemnityStatus.accepted:
            text = 'Indenização concluída'
            break
        case IndemnityStatus.denied:
            text = 'Indenização recusada'
            break
    }
    return (
        <Container>
            <Link href={"/indemnity/" + id}>
                <IndemnityIcon />
                <p>{text}</p>
                <AiOutlineRight />
            </Link>
        </Container>
    )
}

export default IndemnityBox
