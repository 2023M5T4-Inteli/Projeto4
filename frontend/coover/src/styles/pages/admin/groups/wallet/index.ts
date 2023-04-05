import styled from 'styled-components'

export const PageContainer = styled.div`
    min-heigth: 100vh;
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

export const MetamaskContainer = styled.div`
    display: flex;
    grid-gap: 20px;
    align-items: center;

    form {
        flex: 1;
        display: flex;
        flex-direction: column;
        grid-gap: 20px;
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

export const LeftContainer2 = styled.div`
    flex: 1 0 10vw;
    position: relative;

    h1 {
        text-align: start;
        font-size: 35px;
        font-weight: 600;
        padding-top: 10px;
    }

    h3 {
        text-align: start;
        color: grey;
        font-size: 25px;
        font-weight: 600;
        padding-top: 20px;
    }
`

export const RightContainer2 = styled.div`
    flex: 0 1 25vw;
    position: auto;
    text-align: center;
    padding-left: 20px;
    h1 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
    }

    h3 {
        font-size: 20px;
        font-weight: 300;
    }
`

export const AuthBox2 = styled.div`
    flex: 0 1 50vw;
    position: auto;
    text-align: center;
`

export const CaixaTexto = styled.div`
    border: 3px solid #02de82;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    grid-gap: 20px;

    label {
        font-size: 20px;
    }

    p {
        font-size: 18px;
    }
`
export const CaixaTexto2 = styled.div`
    background-color: #f2f2f2;

    width: auto;
    padding-top: 10px;
    padding-left: 20px;
    margin-bottom: 30px;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    color: #333;
    border-radius: 10px;

    h1 {
        font-size: 20px;
        font-weight: 500;
        padding-top: 0;
        color: #248b47;
        margin-left: 170px;
    }

    h3 {
        text-align: start;
        color: grey;
        font-size: 20px;
        font-weight: 500;
        padding-top: 0;
        margin-right: 30px;
    }
`

export const CaixaTexto3 = styled.div`
    background-color: #f2f2f2;
    width: auto;
    padding-top: 10px;
    padding-left: 20px;
    margin-bottom: 30px;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    color: #333;
    border-radius: 10px;

    h1 {
        font-size: 20px;
        font-weight: 500;
        padding-top: 0;
        color: #c53e20;
        margin-left: 200px;
    }

    h3 {
        text-align: start;
        color: grey;
        font-size: 20px;
        font-weight: 500;
        padding-top: 0;
        margin-right: 30px;
    }
`
