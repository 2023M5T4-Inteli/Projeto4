import styled, { css } from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    justify-content: space-between;
    align-items: center;
    grid-gap: 40px;
`

interface ItemInterface {
    isActive: boolean
}

export const Item = styled.div<ItemInterface>`
    padding: 20px 30px;
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

    svg {
        width: 40px;
        height: 40px;
        fill: ${props => props.theme.colors.white};
        transition: all .2s;
    }
`
