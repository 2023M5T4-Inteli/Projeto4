import React from 'react'
import Sidebar from '../sidebar'
import { Container, Content, Subtitle, Title } from './style'

interface Props {
    children: JSX.Element
    title: string
    subtitle?: string
}

const AdminWrapper: React.FC<Props> = ({ children, title, subtitle }) => {
    return (
        <Container>
            <Sidebar />
            <Content>
                <Title>{title}</Title>
                {subtitle && <Subtitle>{subtitle}</Subtitle>}
                {children}
            </Content>
        </Container>
    )
}

export default AdminWrapper
