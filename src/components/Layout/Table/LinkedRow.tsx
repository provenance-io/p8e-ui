import styled from 'styled-components';
import { ColorLink } from 'components/Link';
import { ROW_HOVER_BACKGROUND } from 'Constant/colors';

export const LinkedRow = styled(ColorLink).attrs({ color: 'inherit' })`
    display: table-row;

    &:hover {
        background-color: ${ROW_HOVER_BACKGROUND};
    }
`;