import Link from 'next/link'
import React from 'react'
import { Container, Mail } from './style'

interface Props {
    id: number
    message: string
}

const Notification: React.FC<Props> = ({ id, message }) => {
    return (
        <Container>
            <Mail />
            <Link key={id} href={'/invite/' + id}>
                <p>{message}</p>
            </Link>
        </Container>
    )
}

export default Notification
