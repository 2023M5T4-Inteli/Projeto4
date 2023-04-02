import styled from 'styled-components'

export const Container = styled.div`
    padding: 10px 15px;
    border-radius: 10px;
    border: 1px solid ${props => props.theme.colors.primary};
    margin-bottom: 10px;

    label {
        font-size: 18px;
        color: ${props => props.theme.colors.greyDark1};
        margin-bottom: 8px;
    }
    
    p {
        font-size: 16px;
    }
`
