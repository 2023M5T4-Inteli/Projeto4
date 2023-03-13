import React from 'react'
import Header from '../header'
import Navbar from '../navbar'
import { Container, Content } from './style'

interface Props {
    children: JSX.Element
}

const PageWrapper: React.FC<Props> = ({ children }) => {
    return (
        <Container>
            <Header />
            <Content>{children}</Content>
            <Navbar />
        </Container>
    )
}

export default PageWrapper
