import styled from 'styled-components';

export const StartText = styled.p`
  font-size: 20px;
  padding: 6px 0;
  border-bottom: 1px solid ${props => props.theme.colors.greyLight4};
  margin-bottom: 40px;
  color: ${props=> props.theme.colors.greyDark1};
`;