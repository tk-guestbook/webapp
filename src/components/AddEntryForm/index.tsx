import React, { useCallback } from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import { useDispatch } from "react-redux";
import { addEntryAsync } from "../../features/entry/entrySlice";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";


const validationSchema = yup.object().shape({
    name: yup.string().required('This field is required')
        .min(5, 'Minimum 5 characters')
        .max(64, 'Maximum 64 characters'),
    message: yup.string()
        .required('This field is required')
        .min(5, 'Minimum 5 characters')
        .max(1024, 'Maximum 1024 characters')
});

const Container = styled.div`
  
`;

type FormValues = {
    name: string;
    message: string;
}

const initialValues = {
    name: '',
    message: ''
};

const AddEntryForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = useCallback(
        (values, actions: FormikHelpers<FormValues>) => {
            dispatch(addEntryAsync(values));
        },
        [dispatch]
    );

    return (
        <Container>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                isInitialValid={false}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({isValid, touched, errors}) => (
                    <Form>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Your Name</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <Field className={`input ${touched.name && errors.name && 'is-danger'}`}
                                               type="text"
                                               name="name"
                                               placeholder="Billy Ray"/>
                                    </div>

                                    <ErrorMessage name="name">
                                        {(message) => (
                                            <p className="help is-danger">
                                                {message}
                                            </p>
                                        )}
                                    </ErrorMessage>
                                </div>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Your Message</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <Field as="textarea"
                                               className={`textarea ${touched.message && errors.message && 'is-danger'}`}
                                               name="message"
                                               placeholder="Howdy, partner!"/>
                                    </div>

                                    <ErrorMessage name="message">
                                        {(message) => (
                                            <p className="help is-danger">
                                                {message}
                                            </p>
                                        )}
                                    </ErrorMessage>
                                </div>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label">
                                {/* Left empty for spacing */}
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <button className="button is-primary"
                                                type="submit"
                                                disabled={!isValid}>
                                            Add Entry
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default AddEntryForm;
