import styled, { css } from 'styled-components'

interface ButtonProps {
    marginTop?: boolean
    lessPadding?: boolean
    light?: boolean
    inline?: boolean
    red?: boolean
    noMargin?: boolean
}

export const Button = styled.button<ButtonProps>`
    border-radius: 30px;
    background-color: ${props => props.theme.colors.primary};
    font-size: 20px;
    padding: 12px 110px;
    border: none;
    margin: 0 auto;
    text-align: center;
    display: block;
    font-weight: 500;
    position: relative;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    grid-gap: 10px;
    cursor: pointer;

    ${props => props.lessPadding && `padding: 12px 50px;`}

    ${props => props.marginTop && `margin-top: 15px;`}

    ${props =>
        props.light &&
        css`
            background-color: ${({ theme }) =>
                theme.colors.greyLight3} !important;
            color: ${({ theme }) => theme.colors.greyDark1} !important;
        `}
    
        ${props =>
        props.inline &&
        css`
            display: inline-block;
            width: auto;
            padding: 12px 30px;
        `}

    ${props =>
        props.red &&
        css`
            background-color: red;
            color: ${props => props.theme.colors.white};
        `}

        ${props => props.noMargin && `margin: 0;`}

    &:hover {
        transform: scale(1.05);
    }

    &[disabled] {
        background-color: ${props => props.theme.colors.greyLight4};
        color: ${props => props.theme.colors.white};
    }
`

export const LogoutButton = styled(Button)`
    background-color: red;
    color: ${props => props.theme.colors.white};
    border-radius: 3px;
    display: inline;
    padding: 12px 20px;

    span {
        display: flex;
        align-items: center;
        grid-gap: 10px;
    }
`
