import React from 'react'
import { Container, WarningIcon } from './style'

interface Props {
    title: string
    description: string
}

const Warning: React.FC<Props> = ({title, description}) => {
    return (
        <Container>
            <WarningIcon />
            <div>
                <p>{title}</p>
                <span>{description}</span>
            </div>
        </Container>
    )
}

export default Warning
