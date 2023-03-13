import styled from 'styled-components'

export const HeaderContainer = styled.div`
    width: 100vw;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;

    div {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translate(-50%, -50%);

        svg {
            width: 25px;
            height: 25px;
            fill: ${props => props.theme.colors.black};
        }
    }
`
