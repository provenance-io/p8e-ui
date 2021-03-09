import React, { FunctionComponent } from 'react';
import * as yup from 'yup';
import { withFormik, Form, FormikProps } from 'formik';
import { Button, ButtonGroup } from 'components/Button';
import { usePublicKeys } from 'hooks/key-hooks';
import { Loader } from 'components/Loader/Loader';
import { KeyTypes } from 'models/keys';
import { Sprite } from 'components/Sprite';
import { H4 } from 'components/Text';
import { FlexContainer } from 'components/Layout/Flex';
import { Checkbox, FormWrapper, TextInput } from 'components/Form';
import { Modal } from 'components/Modal';

export const AddServiceKeyModal: FunctionComponent = () => {
    const { serviceAccountKey, addServiceKey, serviceAccountKeyFetched } = usePublicKeys();

    if (!serviceAccountKeyFetched) {
        return <Loader solidBackground />
    }

    const handleAddKey = ({ signingPrivateKey, alias }: AddKeyFields) => addServiceKey(signingPrivateKey, alias);

    return <AddKeyModalContainer keyType="SERVICE" isOpen={!serviceAccountKey} addKey={handleAddKey}></AddKeyModalContainer>
}

const AddKeyModal: FunctionComponent<AddKeyModalContainerProps & FormikProps<AddKeyFields>> = ({ keyType = 'CONTRACT', isOpen, onClose = () => {}, isSubmitting, handleSubmit, setFieldValue, values, errors, touched }) => {
    const closable = keyType === 'CONTRACT';

    return <Modal header={
        <FlexContainer alignItems="center">
            <Sprite icon={Sprite.Icon.LOGO} size="30px" style={{ marginRight: 10 }} alt="Provenance Logo" />
            <H4 style={{ margin: 0 }}>Please enter or generate a Provenance {keyType === 'SERVICE' ? 'service' : 'contract'} account key</H4>
        </FlexContainer>} isOpen={isOpen} closable={closable} onClose={onClose}>
        <Form onSubmit={handleSubmit}>
            <FormWrapper>
                <TextInput disabled={isSubmitting} label="Alias" id="alias" value={values.alias} onChange={e => setFieldValue('alias', e.target.value)} />
                {keyType === 'CONTRACT' && <TextInput disabled={isSubmitting} label="Index Name*" id="indexName" value={values.indexName} errorText={errors.indexName} onChange={e => setFieldValue('indexName', e.target.value)}/>}
                <TextInput disabled={isSubmitting} placeholder="leave blank to generate a new key" label="Signing Private Key" id="signingPrivatekey" value={values.signingPrivateKey} errorText={errors.signingPrivateKey} onChange={(e) => setFieldValue('signingPrivateKey', e.target.value)} />
                {keyType === 'CONTRACT' && <Checkbox label="Use same key for both signing and encryption" value="useSigningKeyForEncryption" id="useSigningKeyForEncryption" checked={values.useSigningKeyForEncryption} onChange={e => setFieldValue('useSigningKeyForEncryption', !values.useSigningKeyForEncryption)} inline={false} />}
                {keyType === 'CONTRACT' && <TextInput disabled={isSubmitting || values.useSigningKeyForEncryption} placeholder="leave blank to generate a new key" label="Encryption Private Key" id="encryptionPrivatekey" value={values.encryptionPrivateKey} errorText={errors.encryptionPrivateKey} onChange={(e) => setFieldValue('encryptionPrivateKey', e.target.value)} />}
            </FormWrapper>
            <ButtonGroup>
                <Button disabled={isSubmitting} type="submit">Add Key</Button>
            </ButtonGroup>
        </Form>
    </Modal>
}

interface AddKeyModalContainerProps {
    keyType: KeyTypes;
    addKey: (values: AddKeyFields) => Promise<any>;
    isOpen?: boolean;
    onClose?: () => void;
}

export interface AddKeyFields {
    alias: string;
    indexName: string;
    signingPrivateKey: string;
    encryptionPrivateKey: string;
    useSigningKeyForEncryption: boolean;
}

export const AddKeyModalContainer = withFormik<AddKeyModalContainerProps, AddKeyFields>({
    enableReinitialize: true,

    mapPropsToValues: () => ({
        alias: '',
        indexName: '',
        signingPrivateKey: '',
        useSigningKeyForEncryption: true,
        encryptionPrivateKey: '',
    }),

    validationSchema: (props) => yup.object().shape({
        alias: yup.string(),
        indexName: props.keyType === 'CONTRACT' ? yup.string().required("Index Name is required").matches(/^[^\\/*?"<>| ,#:-_+.]+[^\\/*?"<>| ,#:]*$/, "Index Name cannot contain spaces or any of the following characters: \\/*?\"<>|,#: and can not start with any of the following characters: -_+") : yup.string(),
        useSigningKeyForEncryption: yup.boolean(),
        signingPrivateKey: yup.string().matches(/^[0-9a-fA-F]*$/, "Key must be in hex format"),
        encryptionPrivateKey: yup.string().matches(/^[0-9a-fA-F]*$/, "Key must be in hex format"),
    }),

    handleSubmit: (values, { props, resetForm, setSubmitting }) => {
        props.addKey(values).then(() => {
            resetForm()
        }).catch(() => setSubmitting(false))
    }
})(AddKeyModal);