import styled from 'styled-components';
import { PRIMARY_BACKGROUND, PRIMARY_FONT } from 'Constant/colors';

export default styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  min-height: 100vh;
  min-width: 1200px; // not responsive
  color: ${PRIMARY_FONT};
  background-color: ${PRIMARY_BACKGROUND};
`;
