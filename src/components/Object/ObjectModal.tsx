import React, { FunctionComponent } from 'react';
import { Modal } from 'components/Modal';
import { H3, H4, Json } from 'components/Text';

type ObjectLinkContainerProps = {
    object: any;
    onClose: () => void;
    title: string;
    subtitle?: string;
}

export const ObjectModal: FunctionComponent<ObjectLinkContainerProps> = ({ object, title, subtitle, onClose }) => {
    return <Modal isOpen={!!object} onClose={onClose} header={<>
        <H3 style={{margin: 0, textTransform: 'none'}}>{title}</H3>
        {subtitle && <H4 style={{margin: '5px 0 0 0'}}>{subtitle}</H4>}
    </>}>
        <Json object={object} />
    </Modal>
}