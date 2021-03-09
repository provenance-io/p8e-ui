import styled from 'styled-components';

type GridProps = {
    columnTemplate?: string;
    gridTemplate?: string;
}

export const Grid = styled.div<GridProps>`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: ${({ columnTemplate }) => columnTemplate};
    grid-template: ${({ gridTemplate }) => gridTemplate};

    &:not(:last-child) {
        margin-bottom: 20px;
    }

    > .card {
        margin-bottom: 0;
    }
`

Grid.defaultProps = {
    columnTemplate: '1fr 1fr',
}