import { opacity, PRIMARY_FONT, SECONDARY_CARD_BACKGROUND } from 'Constant/colors';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Sprite } from 'components/Sprite';
import { H3 } from 'components/Text';
import { Color } from 'Constant';

type ModalProps = {
    isOpen?: boolean;
    closable?: boolean;
    onClose?: () => void;
    header?: string | React.ReactElement;
    opaqueBackground?: boolean;
}

export const Modal: FunctionComponent<ModalProps> = ({isOpen = true, closable = true, onClose = () => {}, header, opaqueBackground = false, children}) => {
    if (!isOpen) {
        return <></>;
    }

    const handleClose = () => closable && onClose && onClose()

    const headerElement = typeof header === 'string' ? <H3 style={{ margin: 0 }}>{header}</H3> : header

    return <ModalOverlay onClick={handleClose} opaqueBackground={!closable || opaqueBackground}>
        <ModalContentWrapper onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
                <div>{headerElement}</div>
                {closable && <ModalCloseButton onClick={handleClose} />}
            </ModalHeader>
            <ModalContents>
                {children}
            </ModalContents>
        </ModalContentWrapper>
    </ModalOverlay>
}

type ModalOverlayProps = {
    opaqueBackground: boolean;
}

const ModalOverlay = styled.div<ModalOverlayProps>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${({ opaqueBackground }) => opacity(opaqueBackground ? 1 : .5)(Color.BLACK)};
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ModalContentWrapper = styled.div`
    min-width: 40%;
    max-width: 80%;
    min-height: 20%;
    max-height: 90%;
    padding: 20px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    
    background: ${SECONDARY_CARD_BACKGROUND};
`

const ModalCloseButton = styled(Sprite).attrs({ icon: Sprite.Icon.CLOSE, width: '20px', height: '20px' })`
    cursor: pointer;
    flex-grow: 0;
    color: ${PRIMARY_FONT};
`

const ModalHeader = styled.div`
    flex-grow: 0;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
`

const ModalContents = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
`