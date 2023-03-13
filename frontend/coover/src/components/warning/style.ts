import { AiFillWarning } from 'react-icons/ai'
import styled from 'styled-components'

export const Container = styled.div`
    padding: 20px;
    display: flex;
    grid-gap: 10px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin: 40px 0;
    align-items: center;

    P {
        font-weight: 600;
        font-size: 16px;
    }

    label {
        font-size: 14px;
    }
`

export const WarningIcon = styled(AiFillWarning)`
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    fill: ${props => props.theme.colors.black};
`
