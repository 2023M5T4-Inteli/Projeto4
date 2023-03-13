import React from 'react'
import { Container } from './style'

interface Props {
    label: string
    value?: string
}

const ViewInfo: React.FC<Props> = props => {
    return (
        <Container>
            <label>{props.label} </label>
            <p>{props.value}</p>
        </Container>
    )
}

export default ViewInfo
