import styled from 'styled-components';

export const Status = styled.p`
  font-size: 20px;
  font-weight: 500;

  span {
    font-weight: 400;
    color: ${props => props.theme.colors.primary};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
`;