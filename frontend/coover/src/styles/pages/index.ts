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
export const PageContainer2 = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    bottom: 15px;

    h1 {
        font-size: 40px;
        font-weight: 600;
        text-align: center;
        padding-top: 0;
    }


    h2 {
        font-weight: 400;
        font-size: 20px;
        text-align: justify;
        width: 75%;
        margin-bottom: 40px;
        margin: 5px auto;
        
    }

    h3 {
        font-weight: 400;
        font-size: 20px;
        text-align: center;
        width: 75%;
        margin: 5px auto;
        margin-bottom: 15px;
        color: #02DE82;
    }

    a {
        color: #02DE82;
    }

    h4 {
        font-weight: 600;
        font-size: 20px;
        text-align: center;
        width: 75%;
        margin: 5px auto;
        margin-bottom: 15px;
        color: #02DE82;
        color-background: #000000;
    }


`
export const BlackBackground2 = styled.div`
    left: 0;
    width: 40vh;
    height: 50%;
    margin: auto;
    background-color: ${props => props.theme.colors.black};

    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
`