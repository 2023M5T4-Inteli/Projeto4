import styled from 'styled-components'

export const Form = styled.form`
    margin: 50px 0;
    display: flex;
    grid-gap: 20px;
    flex-direction: column;

    border-top: 1px solid ${props => props.theme.colors.greyLight4};
    padding-top: 30px;
    p {
        font-size: 20px;
        text-align: center;
        font-weight: 600;
    }
`
