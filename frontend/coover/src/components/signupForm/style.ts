import styled from 'styled-components'

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    grid-gap: 16px;
    width: 80%;
    margin: 30px auto;

    a {
        text-decoration: none;
        text-align: center;
        margin-top: 5px;
        color: ${props => props.theme.colors.primary};
        cursor: pointer;
    }
`
