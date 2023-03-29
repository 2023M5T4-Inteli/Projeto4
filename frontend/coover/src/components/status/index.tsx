import Link from 'next/link'
import React from 'react'
import { Container, Status } from './style'

interface Props {
    id: number
    message: string
    group: string
    min: number
    max: number
    total: number
}

const Notification: React.FC<Props> = ({ id, message, group, min, max, total }) => {
    return (
        <Status>
            <Container>
                <Link key={id} href={'/invite/' + id}>
                    <h4>#{group}</h4>
                    <h1>{message}</h1>
                    <p>Mínimo: {min}</p>
                    <p>Máximo: {max}</p>
                    <h4>Total: {total}</h4>
                </Link>
            </Container>
        </Status>
    )
}
 
export default Notification
