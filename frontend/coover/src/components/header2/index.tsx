import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HeaderContainer2 } from './style'
import { useUser } from '@/contexts/user'
import CooverLogo from '../../assets/images/coover_logo.png'

interface Props { }

const Header2: React.FC<Props> = props => {
    const { user } = useUser()
    return (
        <HeaderContainer2>
            <Image src={CooverLogo} alt="Coover logo" />
        </HeaderContainer2>
    )
}

export default Header2
