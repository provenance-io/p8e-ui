import styled from 'styled-components';

type PreProps = {
  margin?: string;
  padding?: string;
}

export const Pre = styled.pre<PreProps>`
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  white-space: pre-wrap;
  word-break: break-word;
`;

Pre.defaultProps = {
  margin: '15px 0',
  padding: '15px',
};