import styled from 'styled-components'

export const Container = styled.div`
    min-height: 100vh;
    width: 100%;
    background-color: ${props => props.theme.colors.black};
    display: flex;
    align-items: stretch;
    padding: 80px;
`

export const Content = styled.div`
    padding: 40px;
    background-color: ${props => props.theme.colors.white};
    flex: 1;
    border-radius: 30px;
    position: relative;
`

export const Title = styled.h4`
    font-size: 40px;
    font-weight: 500;
    margin-bottom: 20px;

`

export const Subtitle = styled.p`
  font-size: 20px;
  margin-bottom: 20px;
`

