import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Container, MoneyIcon, PeopleIcon, WalletIcon } from './style'
import { useUser } from '@/contexts/user'

interface Props {}

const items = [
    {
        icon: PeopleIcon,
        link: '/group',
        text: 'Grupo'
    },
    {
        icon: WalletIcon,
        link: '/wallet',
        text: 'Fundos'
    }
]

const Navbar: React.FC<Props> = props => {
    const router = useRouter()
    const { user } = useUser()

    if (user?.insuranceActive) {
        items.push({
            icon: MoneyIcon,
            link: '/indemnity',
            text: 'Indenização'
        })
    }

    return (
        <Container>
            {items.map(item => (
                <div key={item.link}>
                    <Link href={item.link}>
                        <item.icon isActive={router.asPath == item.link} />
                        <span>{item.text}</span>
                    </Link>
                </div>
            ))}
        </Container>
    )
}

export default Navbar
