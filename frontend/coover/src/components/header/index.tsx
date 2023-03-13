import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CooverLogo from '../../assets/images/coover_logo.png'
import { HeaderContainer } from './style'
import { useUser } from '@/contexts/user'
import { BsFillPersonFill, BsPersonCircle } from 'react-icons/bs'

interface Props {}

const Header: React.FC<Props> = props => {
    const { user } = useUser()
    return (
        <HeaderContainer>
            <Link href="/dashboard">
                <Image src={CooverLogo} alt="Coover logo" />
            </Link>

            {user && (
                <div>
                    <Link href={'/account'}>
                        <BsPersonCircle />
                    </Link>
                </div>
            )}
        </HeaderContainer>
    )
}

export default Header
