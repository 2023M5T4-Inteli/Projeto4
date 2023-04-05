import styled, { css } from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

interface ItemInterface {
    isActive: boolean
}

export const Item = styled.div<ItemInterface>`
    padding: 10px 20px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    cursor: pointer;

    &:hover {
        svg {
            transform: scale(1.1);
        }
    }

    ${props =>
        props.isActive &&
        css`
            background-color: ${props => props.theme.colors.white};

            svg {
                fill: ${props => props.theme.colors.black} !important;
            }
        `}

    a {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    svg {
        width: 30px;
        height: 30px;
        fill: ${props => props.theme.colors.white};
        transition: all .2s;
    }
`
