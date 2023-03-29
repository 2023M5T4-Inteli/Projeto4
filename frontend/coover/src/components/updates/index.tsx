import Link from 'next/link'
import React from 'react'
import { Container, Mail, Div} from './style'

interface Props {
    id: number
    message: string
    page: string
}

const Notification: React.FC<Props> = ({ id, message, page }) => {
    return (
        <Div>
            <Container>
                <Mail />
                <Link key={id} href={page + id}>
                    <p>{message}</p>
                </Link>
            </Container>
        </Div>
    )
}

export default Notification
