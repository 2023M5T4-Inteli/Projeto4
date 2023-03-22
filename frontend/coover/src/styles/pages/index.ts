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
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        padding-top: 0;
        color: #02DE82;
    }


    h2 {
        font-weight: 400;
        font-size: 20px;
        text-align: center;
        width: 80%;
        padding: 5px;
        margin: 5px auto;
        
    }

    h3 {
        font-weight: 400;
        font-size: 15px;
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
        font-size: 15px;
        text-align: justify;
        width: 100%;
        margin: 5px auto;
        margin-bottom: 15px;
        padding-left:25px;
        padding-right:25px;
       
    }


`
export const BlackBackground2 = styled.div`
    left: 0;
    width: 50vh;
    height: 50%;
    padding:5px 15px 5px 15px;
    margin: 20px;
    background-color: ${props => props.theme.colors.black};
    margin:auto;
    margin-top:20px;
    margin-bottom:20px;

    border-radius:30px
`