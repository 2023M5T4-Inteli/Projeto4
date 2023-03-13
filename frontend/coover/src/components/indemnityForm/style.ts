import styled from 'styled-components'

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    grid-gap: 15px;
    margin: 40px auto;
    margin-bottom: 100px;

    a {
        text-decoration: none;
        text-align: center;
        margin-top: 5px;
        color: ${props => props.theme.colors.primary};
        cursor: pointer;
    }
`
