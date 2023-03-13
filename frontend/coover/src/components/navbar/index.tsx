import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Container, MoneyIcon, PeopleIcon, WalletIcon } from './style'

interface Props {}

const items = [
    {
        icon: PeopleIcon,
        link: '/group',
        text: 'Grupo'
    },
    {
        icon: MoneyIcon,
        link: '/indemnity',
        text: 'Indenização'
    },
    {
        icon: WalletIcon,
        link: '/wallet',
        text: 'Fundos'
    }
]

const Navbar: React.FC<Props> = props => {
    const router = useRouter()
    return (
        <Container>
            {items.map(item => (
                <div key={item.link}>
                    <Link  href={item.link}>
                        <item.icon isActive={router.asPath == item.link} />
                        <span>{item.text}</span>
                    </Link>
                </div>
            ))}
        </Container>
    )
}

export default Navbar
