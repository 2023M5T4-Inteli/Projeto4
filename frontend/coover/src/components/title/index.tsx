import React from 'react';
import { TitleDashboard } from './style'

interface Props {
    text: string
}

const Title: React.FC<Props> = ({ text }) => {
    return (
        <TitleDashboard>{text}</TitleDashboard>
    )
}


export default Title;