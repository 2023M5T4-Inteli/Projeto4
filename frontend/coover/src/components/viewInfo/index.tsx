import React from 'react'
import { Container } from './style'
import Moment from 'react-moment'

interface Props {
    label: string
    date?: boolean
    value?: string
}

const ViewInfo: React.FC<Props> = props => {
    return (
        <Container>
            <label>{props.label} </label>
            {props.date? <p><Moment format='DD/MM/YYYY'>{props.value}</Moment></p> : <p>{props.value}</p>}
        </Container>
    )
}

export default ViewInfo
