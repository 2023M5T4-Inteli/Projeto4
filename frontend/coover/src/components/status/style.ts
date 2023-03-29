import styled from 'styled-components'

export const Container = styled.div`
    border-radius: 10px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-gap: 12px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    transition: all 0.2s;
    cursor: pointer;
    text-decoration: none;
    width: 250px;
    height: 250px;

    a {
        color: ${props => props.theme.colors.black};
        text-decoration: none;
    }

    h1 {
        color: ${props => props.theme.colors.black};
        text-decoration: none;
        font-size: 25px;
        margin-top: 3px;
        margin-bottom: 3px;
        color: ${props => props.theme.colors.primary};
    }

    h4 {
        color: ${props => props.theme.colors.black};
        margin-top: 3px;
    }

    p {
        flex: 1 1;
    }

    &:hover {
        transform: scale(1.03);
    }
`

export const Status = styled.div`
    display: inline-block;
    margin: 10px;
`

export const NoNotification = styled.p`
    font-size: 18px;
    text-align: center;
    margin-top: 80%;
    font-weight: 300;
`
