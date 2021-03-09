import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Color, Icon } from 'Constant';

const Svg = styled.svg`
  display: none;
`;

type SpriteSheetProps = {
  additionalSprites?: React.ReactNode;
}

/**
 * Inject *SpriteSheet* into the root of your application or *Sprite* component won't render anything.
 *
 * `fill` and `stroke` must be set to `"currentColor"` otherwise it won't inherit `color` prop from *Sprite*.
 */
const SpriteSheet: FunctionComponent<SpriteSheetProps> = ({ additionalSprites }) => (
  <Svg xmlns="http://www.w3.org/2000/svg">
    <g id={Icon.ADMIN}>
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M8.5 7.5V4.5H11.5V7.5H8.5Z" stroke="currentColor" />
        <path d="M4.5 15.5V12.5H7.5V15.5H4.5Z" stroke="currentColor" />
        <path d="M12.5 15.5V12.5H15.5V15.5H12.5Z" stroke="currentColor" />
        <path d="M6 12.5V10H14V12.5" stroke="currentColor" />
        <path d="M10 7.5V10" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.APPS}>
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M4.5 12.6667V7.33333L10 5.04167L15.5 7.33334V12.6667L10 14.9583L4.5 12.6667Z" stroke="currentColor" />
        <path d="M4.5 7.5L10 9.5L15.5 7.5" stroke="currentColor" />
        <path d="M10 9.5V14.5" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.ARROW}>
      <svg viewBox="0 0 20 20" fill="none">
        <g>
          <circle cx="10" cy="10" r="9.5" transform="rotate(-90 10 10)" stroke="currentColor" />
          <path d="M9 13L12 10L9 7" stroke="var(--secondaryColor)" />
        </g>
      </svg>
    </g>
    <g id={Icon.BACK_ARROW}>
      <svg viewBox="0 0 40 40" fill="none">
        <path d="M28 5L13 20L28 35" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.BANK}>
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M10 4.03093L16.5 6.35236V15.5H3.5V6.35236L10 4.03093Z" stroke="currentColor" />
        <path d="M3 8H16" stroke="currentColor" />
        <path d="M4 13H16" stroke="currentColor" />
        <path d="M7 13L7 8" stroke="currentColor" />
        <path d="M10 13L10 8" stroke="currentColor" />
        <path d="M13 13V8" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.BOXED_ARROW}>
      <svg viewBox="0 0 34 34" fill="none" stroke="currentColor">
        <rect x="1" y="1" width="32" height="32" strokeWidth="2" />
        <path d="M18.8182 13L15 17L18.8182 21" strokeWidth="2" />
      </svg>
    </g>
    <g id={Icon.CARET}>
      <svg viewBox="0 0 9 5" fill="currentColor">
        <path d="M9 -1.43051e-06L4.68 4.5L3.93403e-07 -2.21732e-06L9 -1.43051e-06Z" />
      </svg>
    </g>
    <g id={Icon.CHECKBOX_ACTIVE}>
      <svg viewBox="0 0 20 20" fill="none">
        <rect width="20" height="20" fill="currentColor" />
        <rect width="20" height="20" rx="2" fill="currentColor" />
        <path d="M6 9.96154L8.53846 12.5L14.0385 7" stroke="var(--secondaryColor)" strokeWidth="2" />
      </svg>
    </g>
    <g id={Icon.CHECKBOX_INACTIVE}>
      <svg viewBox="0 0 20 20" fill="none">
        <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.CHECKMARK}>
      <svg viewBox="0 0 8 9" fill="none" stroke="currentColor">
        <path d="M1 3L3 5L7 1" strokeWidth="2" />
      </svg>
    </g>
    <g id={Icon.CHECKMARK_ALT}>
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M7.5 11.5L4.5 8.5L2 11L7.5 16.5L18.5 5.5L16 3L7.5 11.5Z" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.CHEVRON}>
      <svg viewBox="0 0 7 10" fill="none" stroke="currentColor">
        <path d="M5.81818 1L2 5L5.81818 9" strokeWidth="2" />
      </svg>
    </g>
    <g id={Icon.CLOSE}>
      <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8.99984 1L5.09375 5L8.99984 9" />
        <path d="M1.00016 1L4.90625 5L1.00016 9" />
      </svg>
    </g>
    <g id={Icon.CLOSE_CIRCLE}>
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" />
        <path d="M7 13L13 7" stroke="currentColor" />
        <path d="M13 13L7 7" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.CLOSE_SQUARE}>
      <svg viewBox="0 0 34 34" fill="none">
        <rect x="1" y="1" width="32" height="32" stroke="currentColor" strokeWidth="2" />
        <path d="M20.8182 13L17 17L20.8182 21" stroke="currentColor" strokeWidth="2" />
        <path d="M12.9982 13L16.8164 17L12.9982 21" stroke="currentColor" strokeWidth="2" />
      </svg>
    </g>
    <g id={Icon.COLUMNS}>
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M17 17.5H17.5V17V7.39216V3V2.5H17H11H3H2.5V3V17V17.5H3H17Z" stroke="currentColor" strokeMiterlimit="10" />
        <path d="M12.5 3V17" stroke="currentColor" />
        <path d="M7.5 3V17" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.CURRENCY_FPO}>
      <svg viewBox="0 0 10 10" fill="none">
        <circle cx="5" cy="5" r="4.775" stroke="currentColor" strokeWidth="0.45" />
        <path d="M3.0343 6.24232L5.15395 3.24615L7.0809 6.24232H3.0343Z" stroke="currentColor" strokeWidth="0.45" />
      </svg>
    </g>
    <g id={Icon.CUBES}>
      <svg viewBox="0 0 38 33" fill="none">
        <path d="M19 1L10 6V14L19 19L28 14V6L19 1Z" stroke="currentColor" />
        <path d="M19 11L10 6" stroke="currentColor" />
        <path d="M28 6L19 11V18.5" stroke="currentColor" />
        <path d="M10 14L1 19V27L10 32L19 27V19L10 14Z" stroke="currentColor" />
        <path d="M10 24L1 19" stroke="currentColor" />
        <path d="M19 19L10 24V31.5" stroke="currentColor" />
        <path d="M28 14L19 19V27L28 32L37 27V19L28 14Z" stroke="currentColor" />
        <path d="M28 24L19 19" stroke="currentColor" />
        <path d="M37 19L28 24V31.5" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.DOCUMENT}>
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M15.5 17.5H16V17V7.39216V3V2.5H15.5H11.2143H5.5H5V3V17V17.5H5.5H15.5Z" stroke="currentColor" strokeMiterlimit="10" />
        <path d="M5 7.5H10V3" stroke={Color.LIGHT_GREY} />
      </svg>
    </g>
    <g id={Icon.DOWNLOAD}>
      <svg viewBox="0 0 14 10" fill="none">
        <path d="M0.5 5.5L0.5 9.5L13.5 9.5V5.5" stroke="currentColor" />
        <path d="M7 7L9.5 4.5M7 7L4.5 4.5M7 7L7 -2.18557e-07" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.EXPAND}>
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M3 10.5H17" stroke="currentColor" strokeWidth="2" />
        <path d="M10 17.5L10 3.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    </g>
    <g id={Icon.FILTER}>
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M17 3H3L8.63499 11.6016V18.1018L11.4483 15.7273V11.4745L17 3Z" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.GLOBE}>
      <svg viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="16.5" stroke="currentColor" />
        <path
          d="M29.6999 20C29.6999 24.623 28.6214 28.7838 26.9034 31.7716C25.1777 34.7729 22.8689 36.5 20.4249 36.5C17.9809 36.5 15.6721 34.7729 13.9464 31.7716C12.2284 28.7838 11.1499 24.623 11.1499 20C11.1499 15.377 12.2284 11.2162 13.9464 8.22842C15.6721 5.22709 17.9809 3.5 20.4249 3.5C22.8689 3.5 25.1777 5.22709 26.9034 8.22842C28.6214 11.2162 29.6999 15.377 29.6999 20Z"
          stroke="currentColor"
        />
        <path
          d="M36.5 20.4248C36.5 23.1242 34.748 25.6437 31.7558 27.5138C28.7707 29.3795 24.6157 30.5498 20 30.5498C15.3843 30.5498 11.2293 29.3795 8.24418 27.5138C5.25203 25.6437 3.5 23.1242 3.5 20.4248C3.5 17.7254 5.25203 15.2059 8.24418 13.3358C11.2293 11.4701 15.3843 10.2998 20 10.2998C24.6157 10.2998 28.7707 11.4701 31.7558 13.3358C34.748 15.2059 36.5 17.7254 36.5 20.4248Z"
          stroke="currentColor"
        />
        <path
          d="M36.5 20.8501C36.5 21.151 36.244 21.5808 35.4096 22.074C34.6088 22.5473 33.4166 22.991 31.8995 23.3702C28.8732 24.1268 24.6659 24.6001 20 24.6001C15.3341 24.6001 11.1268 24.1268 8.10045 23.3702C6.58343 22.991 5.39125 22.5473 4.59036 22.074C3.756 21.5808 3.5 21.151 3.5 20.8501C3.5 20.5492 3.756 20.1194 4.59036 19.6262C5.39125 19.1529 6.58343 18.7092 8.10045 18.33C11.1268 17.5734 15.3341 17.1001 20 17.1001C24.6659 17.1001 28.8732 17.5734 31.8995 18.33C33.4166 18.7092 34.6088 19.1529 35.4096 19.6262C36.244 20.1194 36.5 20.5492 36.5 20.8501Z"
          stroke="currentColor"
        />
        <path d="M20 3.8501V36.5751" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.HASH}>
      <svg viewBox="0 0 40 40" fill="none">
        <rect x="20" y="3.73654" width="23" height="23" transform="rotate(45 20 3.73654)" stroke="currentColor" />
        <path d="M27.7782 12.2218L13.9896 26.0104" stroke="currentColor" />
        <path d="M11.5147 11.5147L17.8787 17.8787" stroke="currentColor" />
        <path d="M20 20L28.4853 28.4853" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.HELP}>
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" />
        <rect x="9.5" y="6" width="1" height="6" fill="currentColor" />
        <rect x="9.5" y="13" width="1" height="1" fill="currentColor" />
      </svg>
    </g>
    <g id={Icon.HISTORY}>
      <svg viewBox="0 0 20 20" fill="none">
        <path
          d="M8.375 10L8.48016 10.4888C8.70136 10.4412 8.86304 10.251 8.87437 10.0251C8.88571 9.79907 8.74388 9.59365 8.52855 9.52416L8.375 10ZM3.5 2C3.5 5.41688 4.63917 7.53949 5.82131 8.81103C6.40785 9.44193 6.99638 9.85419 7.4426 10.1102C7.66581 10.2382 7.85398 10.3275 7.9894 10.3858C8.05714 10.4149 8.1118 10.4363 8.15117 10.451C8.17086 10.4584 8.18675 10.464 8.19855 10.4681C8.20445 10.4702 8.20933 10.4718 8.21316 10.4731C8.21507 10.4737 8.21672 10.4743 8.21811 10.4747C8.2188 10.475 8.21942 10.4752 8.21998 10.4754C8.22026 10.4755 8.22063 10.4756 8.22077 10.4756C8.22112 10.4757 8.22145 10.4758 8.375 10C8.52855 9.52416 8.52885 9.52426 8.52913 9.52435C8.52921 9.52437 8.52947 9.52446 8.52962 9.52451C8.52991 9.5246 8.53014 9.52468 8.5303 9.52473C8.53062 9.52484 8.53069 9.52486 8.5305 9.5248C8.53012 9.52467 8.52873 9.5242 8.52635 9.52338C8.5216 9.52173 8.51291 9.51865 8.50056 9.51405C8.47585 9.50483 8.43651 9.4895 8.38462 9.46718C8.28079 9.4225 8.12716 9.35002 7.94021 9.24277C7.56612 9.02817 7.0609 8.67572 6.55369 8.13014C5.54833 7.04874 4.5 5.17135 4.5 2H3.5ZM8.26984 9.51118C7.36404 9.70605 6.17472 10.5988 5.22632 12.0024C4.26047 13.432 3.5 15.4506 3.5 18H4.5C4.5 15.6553 5.19787 13.8308 6.05493 12.5623C6.92945 11.2679 7.92763 10.6077 8.48016 10.4888L8.26984 9.51118Z"
          fill="currentColor"
        />
        <path
          d="M11.625 10L11.5198 10.4888C11.2986 10.4412 11.137 10.251 11.1256 10.0251C11.1143 9.79907 11.2561 9.59365 11.4715 9.52416L11.625 10ZM16.5 2C16.5 5.41688 15.3608 7.53949 14.1787 8.81103C13.5922 9.44193 13.0036 9.85419 12.5574 10.1102C12.3342 10.2382 12.146 10.3275 12.0106 10.3858C11.9429 10.4149 11.8882 10.4363 11.8488 10.451C11.8291 10.4584 11.8133 10.464 11.8015 10.4681C11.7956 10.4702 11.7907 10.4718 11.7868 10.4731C11.7849 10.4737 11.7833 10.4743 11.7819 10.4747C11.7812 10.475 11.7806 10.4752 11.78 10.4754C11.7797 10.4755 11.7794 10.4756 11.7792 10.4756C11.7789 10.4757 11.7785 10.4758 11.625 10C11.4715 9.52416 11.4712 9.52426 11.4709 9.52435C11.4708 9.52437 11.4705 9.52446 11.4704 9.52451C11.4701 9.5246 11.4699 9.52468 11.4697 9.52473C11.4694 9.52484 11.4693 9.52486 11.4695 9.5248C11.4699 9.52467 11.4713 9.5242 11.4736 9.52338C11.4784 9.52173 11.4871 9.51865 11.4994 9.51405C11.5242 9.50483 11.5635 9.4895 11.6154 9.46718C11.7192 9.4225 11.8728 9.35002 12.0598 9.24277C12.4339 9.02817 12.9391 8.67572 13.4463 8.13014C14.4517 7.04874 15.5 5.17135 15.5 2H16.5ZM11.7302 9.51118C12.636 9.70605 13.8253 10.5988 14.7737 12.0024C15.7395 13.432 16.5 15.4506 16.5 18H15.5C15.5 15.6553 14.8021 13.8308 13.9451 12.5623C13.0705 11.2679 12.0724 10.6077 11.5198 10.4888L11.7302 9.51118Z"
          fill="currentColor"
        />
        <path d="M3 18.5L17 18.5L17 17.5L3 17.5L3 18.5Z" fill="currentColor" />
        <path d="M3 2.5L17 2.5L17 1.5L3 1.5L3 2.5Z" fill="currentColor" />
      </svg>
    </g>
    <g id={Icon.IN_PROGRESS}>
      <svg viewBox="0 0 18 18" fill="none">
        <path
          d="M9 0.5C10.6811 0.5 12.3245 0.998516 13.7223 1.93251C15.1202 2.8665 16.2096 4.19402 16.853 5.74719C17.4963 7.30036 17.6646 9.00943 17.3367 10.6583C17.0087 12.3071 16.1992 13.8217 15.0104 15.0104C13.8217 16.1992 12.3071 17.0087 10.6583 17.3367C9.00943 17.6646 7.30036 17.4963 5.74719 16.853C4.19402 16.2096 2.8665 15.1202 1.93251 13.7223C0.998516 12.3245 0.5 10.6811 0.5 9"
          stroke="currentColor"
        />
      </svg>
    </g>
    <g id={Icon.INSTITUTION}>
      <svg viewBox="0 0 30 30" fill="none">
        <path d="M3.5 26.5V9.29579L14.8345 3.06865L26.5 9.29978V26.5H3.5Z" stroke="currentColor" strokeMiterlimit="10" />
        <path d="M5.5 11.5L5.5 24" stroke="currentColor" />
        <path d="M7.5 11.5L7.5 24" stroke="currentColor" />
        <path d="M9.5 9.5L9.5 26" stroke="currentColor" />
        <path d="M3 24L9.5 24" stroke="currentColor" />
        <path d="M3 12L9.5 12" stroke="currentColor" />
        <path d="M20.5 10L20.5 26" stroke="currentColor" />
        <path d="M22.5 11.5L22.5 24" stroke="currentColor" />
        <path d="M24.5 11.5L24.5 24" stroke="currentColor" />
        <path d="M20.5 24L26 24" stroke="currentColor" />
        <path d="M20.5 12L26 12" stroke="currentColor" />
        <path d="M17 26V18H13V26" stroke="currentColor" />
        <path d="M3.5 9.5H26" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.INVENTORY}>
      <svg viewBox="0 0 20 20" fill="none">
        <rect x="4" y="5" width="1" height="1" fill="currentColor" />
        <rect x="6" y="5" width="10" height="1" fill="currentColor" />
        <rect x="4" y="8" width="1" height="1" fill="currentColor" />
        <rect x="6" y="8" width="10" height="1" fill="currentColor" />
        <rect x="4" y="11" width="1" height="1" fill="currentColor" />
        <rect x="6" y="11" width="10" height="1" fill="currentColor" />
        <rect x="4" y="14" width="1" height="1" fill="currentColor" />
        <rect x="6" y="14" width="10" height="1" fill="currentColor" />
      </svg>
    </g>
    <g id={Icon.LOGO}>
      <svg viewBox="0 0 22 31" fill="none">
        <path
          d="M16.5 3.38182L11 0L5.5 3.38182L0 6.76364V12.4V18.0364V27.6182L5.5 31V21.4182L11 24.8L16.5 21.4182L22 18.0364V12.4V6.76364L16.5 3.38182ZM16.5 15.7818L11 19.1636L5.5 15.7818V10.1455L11 6.76364L16.5 10.1455V15.7818Z"
          fill="currentColor"
        />
      </svg>
    </g>
    <g id={Icon.LOGOUT}>
      <svg viewBox="0 0 20 20" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.0001 10C16.0001 12.7614 13.7615 15 11.0001 15C9.60135 15 8.3368 14.4257 7.42933 13.5H6.1261C7.21528 15.0141 8.99253 16 11.0001 16C14.3138 16 17.0001 13.3137 17.0001 10C17.0001 6.68629 14.3138 4 11.0001 4C8.99253 4 7.21528 4.98593 6.1261 6.5H7.42933C8.3368 5.57432 9.60135 5 11.0001 5C13.7615 5 16.0001 7.23858 16.0001 10Z"
          fill="currentColor"
        />
        <line x1="9" y1="10" x2="3" y2="10" stroke="currentColor" />
        <path d="M4.90909 8L3 10L4.90909 12" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.MARKETPLACE}>
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="5.5" stroke="currentColor" />
        <path
          d="M4.5 11C5.5 10.5 7.48021 9.98019 8.5 11C9.5 12 8.66406 12.6641 9.5 13.5C10 14 12 14 12 15.1875"
          stroke="currentColor"
        />
        <path
          d="M13 5.5C11.1948 5.66667 8.70072 6.8176 9.00009 8.5C9.26701 10 10.7285 9.5 12.5592 10C14.061 10.4102 14.6045 11.8298 14.8636 12.6026"
          stroke="currentColor"
        />
      </svg>
    </g>
    <g id={Icon.MENU}>
      <svg viewBox="0 0 20 11" fill="none">
        <rect width="20" height="1" fill="currentColor" />
        <rect y="5" width="20" height="1" fill="currentColor" />
        <rect y="10" width="20" height="1" fill="currentColor" />
      </svg>
    </g>
    <g id={Icon.MINIMIZE}>
      <svg viewBox="0 0 21 20" fill="none">
        <path d="M11 0H1V20H21V10" stroke="currentColor" />
        <path d="M11 4V10H17" stroke="currentColor" />
        <path d="M11 10L21 0.5" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.NAV_ACTIVE}>
      <svg viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="4.5" fill="none" stroke="currentColor" />
        <circle cx="5" cy="5" r="3" fill="currentColor" stroke="none" />
      </svg>
    </g>
    <g id={Icon.NAV_INACTIVE}>
      <svg viewBox="0 0 9 9" fill="none" stroke="currentColor">
        <circle cx="4.5" cy="4.5" r="4" />
      </svg>
    </g>
    <g id={Icon.NOTIFICATION}>
      <svg viewBox="0 0 20 20" fill="none">
        <path
          d="M1.66669 15.3333V17.6667L18.3334 17.6667V15.3333C17 14.6667 16.3334 14 16 13.3333C15.1049 11.543 16.3334 4.33333 11.6667 3.66667C11.5556 3.13967 11.3334 1.99999 10 2C8.66669 2.00001 8.44447 3.13967 8.33335 3.66667C4.33335 4.33333 4.89518 11.543 4.00002 13.3333C3.64225 14.0489 3.00002 14.6667 1.66669 15.3333Z"
          stroke="currentColor"
        />
      </svg>
    </g>
    <g id={Icon.OPEN_ORDERS}>
      <svg viewBox="0 0 20 20" fill="none">
        <g>
          <path
            d="M11.2413 8.77393C12.4144 9.4512 12.8146 10.9448 12.1373 12.1179C11.4601 13.2909 9.96643 13.6912 8.79337 13.0139C7.62032 12.3366 7.2201 10.843 7.89736 9.66994C8.19928 9.14701 8.67458 8.78072 9.20582 8.57864L10.0745 10.795L14.9849 3.25584L6.27776 1.08408L7.13445 3.25583C5.44338 3.9001 3.93807 5.10388 2.9589 6.79987C0.706786 10.7006 2.04483 15.6943 5.9456 17.9464C9.84637 20.1985 14.84 18.8605 17.0921 14.9597C19.3442 11.0589 18.0062 6.06528 14.1054 3.81317"
            stroke="currentColor"
            strokeMiterlimit="10"
          />
        </g>
      </svg>
    </g>
    <g id={Icon.OPTIONS}>
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="16" cy="10" r="1.5" transform="rotate(180 16 10)" fill="currentColor" />
        <circle cx="10" cy="10" r="1.5" transform="rotate(180 10 10)" fill="currentColor" />
        <circle cx="4" cy="10" r="1.5" transform="rotate(180 4 10)" fill="currentColor" />
      </svg>
    </g>
    <g id={Icon.PARTICIPATION}>
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="8" r="3.5" stroke="currentColor" />
        <path d="M15 16C15 14 12.7614 11.5 10 11.5C7.23858 11.5 5 13.5 5 16" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.REPORTS}>
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M6 4H10.5L14.5 8V15.5H6V4Z" stroke="currentColor" />
        <path d="M10.5 4V8.5H14.5" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.PENDING}>
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" />
        <path d="M10 5.5V10L13.5 12.5" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.REVEAL}>
      <svg viewBox="0 0 20 20" fill="none">
        <path
          d="M9.98182 4.98438C6.38909 4.98438 2.49697 8.47241 1 10.1358C2.49697 11.7991 6.40827 14.9844 10.001 14.9844C13.5937 14.9844 17.503 11.7991 19 10.1358C17.503 8.47241 13.5745 4.98438 9.98182 4.98438Z"
          stroke="currentColor"
          strokeWidth="0.921212"
        />
        <path
          d="M14.5394 9.98438C14.5394 12.4972 12.597 14.5238 10 14.5238C8.73117 14.5238 7.59738 13.8889 6.76939 12.9781C5.93579 12.0611 5.46061 10.9172 5.46061 9.98438C5.46061 9.05152 5.93579 7.9076 6.76939 6.99064C7.59738 6.07985 8.73117 5.44498 10 5.44498C11.2688 5.44498 12.4026 6.07985 13.2306 6.99064C14.0642 7.9076 14.5394 9.05152 14.5394 9.98438Z"
          stroke="currentColor"
          strokeWidth="0.921212"
        />
        <circle cx="10" cy="9.98438" r="1" fill="currentColor" />
      </svg>
    </g>
    <g id={Icon.SEARCH}>
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="9.02128" cy="9.02128" r="6.52128" stroke="currentColor" />
        <path d="M13.9362 13.9362L18.5 18.5" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.SECURITIZATION}>
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M4 7L10 4L16 7V16H4V7Z" stroke="currentColor" />
        <path d="M16 7H4" stroke="currentColor" />
        <path d="M10 7L10 16" stroke="currentColor" />
        <path d="M13 7L13 16" stroke="currentColor" />
        <path d="M7 7L7 16" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.SETTINGS}>
      <svg viewBox="0 0 20 20" fill="none">
        <path
          d="M5.34315 9.17157C3.92894 10.5858 2.51472 12 3.22183 14.1213L13.1213 4.22183C11 3.51472 9.58579 4.92893 8.17158 6.34315L5.34315 9.17157Z"
          stroke="currentColor"
        />
        <path d="M6.05029 8.46447L14.5356 16.9497L15.9498 15.5355L7.81806 7.40381" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.SHARED_POOLS}>
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="13.5" cy="6.5" r="2" stroke="currentColor" />
        <circle cx="6.5" cy="10" r="2" stroke="currentColor" />
        <circle cx="13.5" cy="13.5" r="2" stroke="currentColor" />
        <path d="M8.22461 8.97343L11.7069 7.36621" stroke="currentColor" />
        <path d="M8.22456 11L11.8311 12.6645" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.SORT}>
      <svg viewBox="0 0 9 14" fill="none">
        <g>
          <path d="M4.49818 -3.24142e-07L8.99634 6L2.28882e-05 6L4.49818 -3.24142e-07Z" fill="currentColor" />
          <path d="M4.49816 14L0 8H8.99631L4.49816 14Z" fill="var(--secondaryColor)" />
        </g>
      </svg>
    </g>
    <g id={Icon.SPINNER}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          r="30"
          strokeDasharray="141.37166941154067 49.12388980384689"
          transform="rotate(182.503 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="2s"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </g>
    <g id={Icon.SUCCESS}>
      <svg viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" />
        <path d="M7 10.5L9.33333 13L14 8" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.SYNDICATION}>
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M17 16l-4-4V8.82C14.16 8.4 15 7.3 15 6c0-1.66-1.34-3-3-3S9 4.34 9 6c0 1.3.84 2.4 2 2.82V12l-4 4H3v5h5v-3.05l4-4.2 4 4.2V21h5v-5h-4z"
          stroke="currentColor"
        />
      </svg>
    </g>
    <g id={Icon.TRANSACTIONS}>
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M14.5 7H6C6 7 4 7 4 9" stroke="currentColor" />
        <path d="M13 5L15 7L13 9" stroke="currentColor" />
        <path d="M4.5 13H13C13 13 15 13 15 11" stroke="currentColor" />
        <path d="M6 15L4 13L6 11" stroke="currentColor" />
      </svg>
    </g>
    <g id={Icon.TOOLTIP}>
      <svg viewBox="0 0 20 20" fill="none">
        <g>
          <circle cx="10.0039" cy="9.98438" r="10" fill="currentColor" />
          <path
            d="M9.58058 7.688H10.4326V14H9.58058V7.688ZM10.0126 6.308C9.83658 6.308 9.68858 6.248 9.56858 6.128C9.44858 6.008 9.38858 5.864 9.38858 5.696C9.38858 5.536 9.44858 5.396 9.56858 5.276C9.68858 5.156 9.83658 5.096 10.0126 5.096C10.1886 5.096 10.3366 5.156 10.4566 5.276C10.5766 5.388 10.6366 5.524 10.6366 5.684C10.6366 5.86 10.5766 6.008 10.4566 6.128C10.3366 6.248 10.1886 6.308 10.0126 6.308Z"
            fill="var(--secondaryColor)"
          />
        </g>
      </svg>
    </g>
    <g id={Icon.WALLET}>
      <svg viewBox="0 0 20 20" fill="none">
        <path
          d="M5.15385 7C7.22203 7 14.3503 7 17 7V16H3V5C3.36945 5 15.3846 5 15.3846 5C15.3846 5 15.3846 5.91421 15.3846 6.5"
          stroke="currentColor"
        />
      </svg>
    </g>
    {additionalSprites}
  </Svg>
);

SpriteSheet.defaultProps = {
  additionalSprites: null,
};

export default SpriteSheet;