import styled, { css } from 'styled-components'
import { BsFillPeopleFill } from 'react-icons/bs'
import { IoMdWallet } from 'react-icons/io'
import { FaMoneyBillAlt } from 'react-icons/fa'

export const Container = styled.div`
    position: fixed;
    bottom: 0;
    left: 5vw;
    width: 90vw;
    height: 70px;
    display: flex;
    align-items: center;

    justify-content: center;
    grid-gap: 20px;
    border-top: 1px solid ${props => props.theme.colors.greyLight4};
    background-color: ${props => props.theme.colors.white};

    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        grid-gap: 4px;
        text-decoration: none;
        color: ${props => props.theme.colors.black};
    }
`

const icon = css<Item>`
    width: 30px;
    height: 30px;
    fill: ${props => props.theme.colors.primary};
    cursor: pointer;
    transition: all .2s;

    ${props => props.isActive && `border-bottom: 3px solid ${props.theme.colors.primary};`}

    &:hover {
        transform: scale(1.03);
    }
`

interface Item {
    isActive: boolean
}

export const PeopleIcon = styled(BsFillPeopleFill)<Item>`
    ${icon}

    
`

export const MoneyIcon = styled(FaMoneyBillAlt)<Item>`
    ${icon}
`

export const WalletIcon = styled(IoMdWallet)<Item>`
    ${icon}
`
