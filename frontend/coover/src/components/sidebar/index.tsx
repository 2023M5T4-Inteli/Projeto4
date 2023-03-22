import Image from 'next/image'
import React from 'react'
import { Container, Item } from './style'
import CooverLogo from '../../assets/images/coover_green_logo.png'
import { MdDashboard, MdOutlineGroups2 } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaMoneyBill, FaWallet } from 'react-icons/fa'
import { IoMdExit } from 'react-icons/io'
import Link from 'next/link'
import { useRouter } from 'next/router'

const items = [
    {
        icon: MdDashboard,
        link: '/admin/dashboard'
    },
    {
        icon: AiOutlinePlus,
        link: '/admin/contract/new'
    },
    {
        icon: FaWallet,
        link: '/admin/walletCoover'
    },
    {
        icon: MdOutlineGroups2,
        link: '/admin/groups'
    },
    {
        icon: FaMoneyBill,
        link: '/admin/3'
    },
    {
        icon: IoMdExit,
        link: '/admin/auth'
    }
]

interface Props { }

const Sidebar: React.FC<Props> = props => {
    const router = useRouter()

    return (
        <Container>
            <Image src={CooverLogo} width={50} alt="Coover logo" />
            {items.map(item => (
                <Item key={item.link} isActive={router.asPath == item.link}>
                    {item.link &&
                        (
                            <Link href={item.link}>
                                <item.icon />
                            </Link>
                        )}
                </Item>
            ))}
        </Container>
    )
}

export default Sidebar
