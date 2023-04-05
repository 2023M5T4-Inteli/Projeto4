import Link from 'next/link'
import React from 'react'
import { Container, Status } from './style'

interface Props {
    _id: number
    minPeople: number
    maxPeople: number
    total: number
    page: string
}

const Notification: React.FC<Props> = ({ _id, page,  minPeople, maxPeople, total }) => {
    return (
        <Status>
            <Container>
                <Link href={"/"}>
                    <h4>#{_id}</h4>
                    <p>Mínimo: {minPeople}</p>
                    <p>Máximo: {maxPeople}</p>
                </Link>
            </Container>
        </Status>
    )
}

export default Notification

//<Link key={_id} href={page + _id}>
