import styled from 'styled-components'
import { AiTwotoneBell } from 'react-icons/ai'

export const Container = styled.div`
    border-radius: 10px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-gap: 12px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    transition: all 0.2s;
    cursor: pointer;
    text-decoration: none;
    width: 341px;

    a {
        color: ${props => props.theme.colors.black};
        text-decoration: none;
    }

    p {
        flex: 1 1;
    }

    &:hover {
        transform: scale(1.03);
    }
`

export const Div = styled.div`
        display: inline-block;
        margin: 10px;
`

export const Mail = styled(AiTwotoneBell)`
    width: 30px;
    height: 30px;
    fill: ${props => props.theme.colors.primary};
`

export const NoNotification = styled.p`
    font-size: 18px;
    text-align: center;
    margin-top: 80%;
    font-weight: 300;
`
