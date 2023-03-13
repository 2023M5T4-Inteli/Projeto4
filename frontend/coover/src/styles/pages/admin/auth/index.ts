import styled from 'styled-components'

export const PageContainer = styled.div`
    display: flex;
    min-height: 100vh;
`

export const LeftContainer = styled.div`
    flex: 1 0 50vw;
    background-color: ${props => props.theme.colors.black};
    position: relative;

    img {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

export const AuthBox = styled.div`
    width: 35vw;
    height: 35vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: ${props => props.theme.colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        font-size: 40px;
        font-weight: 600;
        margin-bottom: 10px;
    }

    h3 {
        font-size: 20px;
        font-weight: 300;
    }
`

export const RightContainer = styled.div`
    flex: 0 1 50vw;
    background-color: ${props => props.theme.colors.primary};
`
