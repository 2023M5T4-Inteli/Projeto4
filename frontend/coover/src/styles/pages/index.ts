import styled from 'styled-components'

export const PageContainer = styled.div`
    position: relative;
    min-height: 100vh;

    h1 {
        font-size: 40px;
        font-weight: 600;
        text-align: center;
        padding-top: 60vh;
    }

    h2 {
        font-weight: 400;
        font-size: 20px;
        text-align: center;
        width: 70%;
        margin: 30px auto;
        margin-bottom: 80px;
    }
`
export const BlackBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: ${props => props.theme.colors.black};

    border-bottom-left-radius: 150px;
    border-bottom-right-radius: 150px;
`
export const LogoContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150px;
    height: 150px;
    transform: translate(-50%, -50%);
`


