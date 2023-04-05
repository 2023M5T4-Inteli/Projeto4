import React from 'react'
import Header from '../header'
import Navbar from '../navbar'
import { Container, Content } from './style'
import { useUser } from '@/contexts/user'

interface Props {
    children: JSX.Element
}

const PageWrapper: React.FC<Props> = ({ children }) => {
    const { user } = useUser()

    return (
        <Container>
            <Header />
            <Content>{children}</Content>
            {user?.insurance && <Navbar />}
        </Container>
    )
}

export default PageWrapper
