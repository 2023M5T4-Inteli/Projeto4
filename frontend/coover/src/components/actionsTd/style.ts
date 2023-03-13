import styled from 'styled-components'

export const ActionsTd = styled.p`
    display: flex;
    grid-gap: 6px;

    svg {
        width: 20px;
        height: 20px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            transform: scale(1.1);
        }
    }
`
