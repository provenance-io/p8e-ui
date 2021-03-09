import styled from 'styled-components';

type FlexContainerProps = {
    /** Establishes the main-axis, thus defining the direction flex items are placed in the flex container. */
    flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    /** By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap as needed with this property. */
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    /** Defines the alignment along the main axis. */
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    /** Defines the default behavior for how flex items are laid out along the cross axis on the current line */
    alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
    /** Aligns a flex container's lines within when there is extra space in the cross-axis, has no effect when there is only one line of flex items. */
    alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
}

export const FlexContainer = styled.section<FlexContainerProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  align-content: ${({ alignContent }) => alignContent};
`;

FlexContainer.displayName = 'FlexContainer';

FlexContainer.defaultProps = {
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  alignContent: 'flex-start',
};