import React, { CSSProperties, FunctionComponent } from 'react';
import styled from 'styled-components';
import { Color, Icon } from 'Constant';

type SvgProps = {
  secondaryColor?: string;
  size?: string;
  width?: string;
  height?: string;
  flipX?: boolean;
  flipY?: boolean;
  spin?: string | number;
  alt?: string;
}

const Svg = styled.svg<SvgProps>`
  --secondaryColor: ${({ secondaryColor }) => secondaryColor};
  width: ${({ size, width }) => width || size};
  min-width: ${({ size, width }) => width || size};
  height: ${({ size, height }) => height || size};

  transform: ${({ flipX }) => flipX && `scaleX(-1)`} ${({ flipY }) => flipY && `scaleY(-1)`} ${({ spin }) => Boolean(spin) && `rotate(${spin}deg)`};
`;

type SpriteProps = {
  alt?: string;
  color?: string;
  flipX?: boolean;
  flipY?: boolean;
  height?: string;
  icon: string;
  secondaryColor?: string;
  size?: string;
  spin?: string | number;
  width?: string;
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<SVGElement>;
}

const Sprite: FunctionComponent<SpriteProps> & { Icon: typeof Icon } = ({ alt, icon, ...svgIcons }) =>
  <Svg {...svgIcons} alt={alt || `${icon} icon`}>
    <use href={`#${icon}`} />
  </Svg>

Sprite.defaultProps = {
  color: Color.DARK_BLUE,
  flipX: false,
  flipY: false,
  secondaryColor: Color.WHITE,
  spin: 0,
  size: '100%',
};

// Exposes Icon constant so it doesn't need to be imported separately when consuming component
Sprite.Icon = Icon;

export default Sprite;