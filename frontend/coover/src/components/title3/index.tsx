import React from 'react';
import { TitleDashboard } from './style'

interface Props {
    children: React.ReactNode;
}

const Title: React.FC<Props> = ({ children }) => {
    return (
        <TitleDashboard>{children}</TitleDashboard>
    )
}


export default Title;