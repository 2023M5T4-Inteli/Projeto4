import React from 'react'
import { Container, WarningIcon } from './style'

interface Props {
    title: string
    description: string
    noMargin?: boolean
}

const Warning: React.FC<Props> = ({title, description, noMargin}) => {
    return (
        <Container noMargin={noMargin}>
            <WarningIcon />
            <div>
                <p>{title}</p>
                <span>{description}</span>
            </div>
        </Container>
    )
}

export default Warning
