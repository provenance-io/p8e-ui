import React, { FunctionComponent, useEffect, useRef, useState, CSSProperties } from 'react';
import styled from 'styled-components';
import { Color, Width } from 'Constant';

const Container = styled.div`
    @media print, screen and (min-width: ${Width.MD}px) {
        position: relative;
    }
`;

const Toggle = styled.button`
    padding: 0;
    border: none;
    color: inherit;
    font: inherit;
    background: none;
    cursor: pointer;
    outline: inherit;
`;



const DropdownMenu = styled.ul`
    margin: 0;
    padding: 10px 0;
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: ${Color.WHITE};
    list-style: none;
    z-index: 50;

    @media print, screen and (min-width: ${Width.MD}px) {
        position: absolute;
        width: auto;
        min-width: 170px;
    }
`;

const DropdownItem = styled.li`
    color: ${Color.BLUE};
    font-size: 1.2rem;
    font-weight: 700;
    background-color: ${Color.WHITE};
    cursor: pointer;
    
    & > * {
        padding: 10px 20px;
        display: block;
        width: 100%;
        text-align: left;
    }
    
    &:hover {
        background-color: ${Color.BLUE};
        & > * {
            color: ${Color.WHITE};
        }
    }
`;

type DropdownProps = {
    toggle: React.ReactNode;
    menuList: React.ReactNode[];
    style?: CSSProperties;
    menuStyle?: CSSProperties;
    ariaLabelledbyId?: string;
}

export const Dropdown: FunctionComponent<DropdownProps> = ({ ariaLabelledbyId, menuList, menuStyle, toggle, ...props }) => {
    const toggleRef = useRef(null);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        const handleClick = (e) => {
            if (e.target.parentElement !== toggleRef.current) setOpen(false);
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    });

    return (
    <Container {...props}>
        <Toggle
            ref={toggleRef}
            type="button"
            id={ariaLabelledbyId}
            onClick={() => setOpen((prev) => !prev)}
            aria-haspopup
            aria-expanded={isOpen}
        >
            {toggle}
        </Toggle>

        {isOpen && (
        <DropdownMenu aria-labelledby={ariaLabelledbyId} style={menuStyle}>
            {menuList.map((menuItem, index) => (
            <DropdownItem key={`menu-item-${index}`}>{menuItem}</DropdownItem>
            ))}
        </DropdownMenu>
        )}
    </Container>
    );
};

Dropdown.defaultProps = {
    ariaLabelledbyId: 'dropdown-menu-button',
    menuStyle: {},
};