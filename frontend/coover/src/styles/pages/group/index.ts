import styled from 'styled-components';


interface StatusProps {
  isActive: boolean
}

export const Status = styled.p<StatusProps>`
  font-size: 20px;
  font-weight: 500;

  span {
    font-weight: 400;
    color:  ${props => props.isActive ? props.theme.colors.primary : "#edd900"};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
`;