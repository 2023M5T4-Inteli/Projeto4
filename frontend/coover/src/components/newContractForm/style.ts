import styled from 'styled-components'

export const Form = styled.form`
  height: 100%;

    button {
      float: right;
    }
`

export const Grid = styled.div`
   display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 20px;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 40px;
  right: 40px;
`;