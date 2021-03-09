import styled from 'styled-components';

type FlexItemProps = {
    /** By default, flex items are laid out in the source order. However, the order property controls the order in which they appear in the flex container. */
    order?: number;
    /** This defines the ability for a flex item to grow if necessary. It accepts a unitless value that serves as a proportion. It dictates what amount of the available space inside the flex container the item should take up. */
    flexGrow?: number;
    /** This defines the ability for a flex item to shrink if necessary. */
    flexShrink?: number;
    /** This defines the default size of an element before the remaining space is distributed. It can be a length (e.g. 20%, 5rem, etc.) or auto. */
    flexBasis?: 'auto' | string,
    /** This allows the default alignment (or the one specified by align-items) to be overridden for individual flex items. */
    alignSelf?: 'auto' | 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
}

export const FlexItem = styled.span<FlexItemProps>`
    order: ${({ order }) => order};
    flex-grow: ${({ flexGrow }) => flexGrow};
    flex-shrink: ${({ flexShrink }) => flexShrink};
    flex-basis: ${({ flexBasis }) => flexBasis};
    align-self: ${({ alignSelf }) => alignSelf};
`;

FlexItem.displayName = 'FlexItem';

FlexItem.defaultProps = {
    order: 0,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    alignSelf: 'auto',
};