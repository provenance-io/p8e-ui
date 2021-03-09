import theme from 'styled-theming';

export const WHITE = '#FFFFFF';
export const SKY = '#C8D4F1';
export const LIGHT_GREY = '#9EAAC7';
export const PALE_GREY = '#F0F2F8';
export const MEDIUM_GREY = '#DCE1EB';
export const GREY = '#383E55';
export const DARK_GREY = '#292D3E';
export const STEEL = '#39456B';
export const MIDNIGHT = '#1F222E';
export const BLACK = '#191C27';
export const LIGHT_BLUE = '#6CADFF';
export const BLUE = '#498AFD';
export const DARK_BLUE = '#3677EA';
export const FOREST_GREEN = '#349B70';
export const LIGHT_GREEN = '#80F33F';
export const ORANGE = '#F3C13F';
export const TEAL = '#03DAD5';
export const RED = '#E94A4A';
export const BURGUNDY = '#9B346C';
export const PURPLE = '#7134AF';

export const opacity = (opacity: number) => (hexColor: string): string => {
    return `${hexColor}${(opacity * 255).toString(16).split('.')[0]}`;
}

export const halfTransparent = opacity(.5);

export const DARK_OVERLAY = `rgba(0, 0, 0, .5)`;

export const PRIMARY_BACKGROUND = theme('mode', {
    dark: BLACK,
    light: PALE_GREY,
});

export const SECONDARY_BACKGROUND = theme('mode', {
    dark: MIDNIGHT,
    light: MIDNIGHT,
});

export const PRIMARY_CARD_BACKGROUND = theme('mode', {
    dark: MIDNIGHT,
    light: WHITE,
});

export const SECONDARY_CARD_BACKGROUND = theme('mode', {
    dark: BLACK,
    light: PALE_GREY,
});

export const CARD_BORDER = theme('mode', {
    dark: 'none',
    light: `1px solid ${MEDIUM_GREY}`,
});

export const PRIMARY_FONT = theme('mode', {
    dark: WHITE,
    light: DARK_GREY,
});

export const SECONDARY_FONT = theme('mode', {
    dark: WHITE,
    light: WHITE
});

export const LINK_COLOR = theme('mode', {
    dark: MEDIUM_GREY,
    light: MEDIUM_GREY,
});

export const ACTIVE_LINK_COLOR = theme('mode', {
    dark: WHITE,
    light: WHITE,
});

export const PRIMARY_TABLE_HEADER = theme('mode', {
    dark: 'transparent',
    light: 'transparent',
});

export const SECONDARY_TABLE_HEADER = theme('mode', {
    dark: DARK_GREY,
    light: PALE_GREY,
});

export const PRIMARY_ROW_BACKGROUND = theme('mode', {
    dark: MIDNIGHT,
    light: WHITE,
});

export const SECONDARY_ROW_BACKGROUND = theme('mode', {
    dark: STEEL,
    light: MEDIUM_GREY,
});

export const ROW_HOVER_BACKGROUND = theme('mode', {
    dark: DARK_GREY,
    light: SKY,
});

export const ChartColors = [BLUE];