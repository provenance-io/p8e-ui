import styled from 'styled-components';
import { TextInput } from './TextInput';

export const NoLabelInput = styled(TextInput)`
  margin: 0;
  
  label {
    display: none;
  }
`;