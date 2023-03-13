import styled, { css } from 'styled-components'

export const Title = styled.h3`
    font-size: 20px;
    text-align: center;
    margin: 20px auto;
    width: 70%;
    font-weight: 400;
`

interface PageContainerProps {
    stage: number
}

export const PageContainer = styled.div<PageContainerProps>`
    display: grid;
    grid-template-columns: repeat(2, 100vw);
    max-height: 100vh;
    grid-gap: 5vw;
    transition: all 0.4s;

    ${props =>
        props.stage == 1 &&
        css`
            transform: translateX(-105vw);
            
        `}
`
