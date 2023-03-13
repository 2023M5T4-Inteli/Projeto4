import styled from 'styled-components'
import { MdOutlineAttachMoney } from 'react-icons/md'

export const Container = styled.div`
    padding: 15px 30px;

    a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: ${props => props.theme.colors.black};
        text-decoration:none;
        cursor: pointer;
    }

    border-radius: 10px;

    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    margin-bottom: auto;
`
export const IndemnityIcon = styled(MdOutlineAttachMoney)`
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    fill: ${props => props.theme.colors.primary};
`
