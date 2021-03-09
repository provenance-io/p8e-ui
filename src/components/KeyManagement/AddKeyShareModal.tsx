import React, { FunctionComponent } from 'react';
import { withFormik, FormikProps, Form } from 'formik';
import * as yup from 'yup';
import { Button, ButtonGroup } from 'components/Button';
import { FormWrapper, TextInput } from 'components/Form';
import { Modal } from 'components/Modal';

const AddKeyShareModal: FunctionComponent<AddKeyShareProps & FormikProps<AddKeyShareFields>> = ({ isOpen, onClose, values, setFieldValue, handleSubmit, isSubmitting, errors }) => <Modal isOpen={isOpen} onClose={onClose} header="Add Key Share">
    <Form onSubmit={handleSubmit}>
        <FormWrapper>
            <TextInput disabled={isSubmitting} label="Public Key*" id="publicKey" value={values.publicKey} onChange={e => setFieldValue('publicKey', e.target.value)} errorText={errors.publicKey} />
        </FormWrapper>
        <ButtonGroup>
            <Button disabled={isSubmitting} type="submit">Add Public Key</Button>
        </ButtonGroup>
    </Form>
</Modal>

interface AddKeyShareFields {
    publicKey: string;
}

interface AddKeyShareProps {
    addKeyShare: (publicKey: string) => Promise<any>;
    isOpen?: boolean;
    onClose?: () => void;
}

export const AddKeyShareModalContainer = withFormik<AddKeyShareProps, AddKeyShareFields>({
    mapPropsToValues: () => ({
        publicKey: ''
    }),
    validationSchema: () => yup.object().shape({
        publicKey: yup.string().required('Public key is required').matches(/^[0-9a-fA-F]*$/, "Key must be in hex format")
    }),
    handleSubmit: (values, { props, resetForm, setSubmitting }) => {
        props.addKeyShare(values.publicKey).then(() => {
            resetForm();
        }).catch(() => setSubmitting(false))
    }
})(AddKeyShareModal);