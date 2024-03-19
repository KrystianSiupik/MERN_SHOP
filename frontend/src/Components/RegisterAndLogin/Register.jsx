import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';

const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordRepeat:''
}

const validationSchema = Yup.object({
    name: Yup.string().min(4, 'Must be at least 4 characters').required('Required field'),
    email: Yup.string().email('Invalid email address').required('Required field'),
    password: Yup.string()
        .required('Required field')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
        ),
    passwordRepeat: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Required field')
});


function Register() {
    const navigate = useNavigate();
    const [errMessage, setErrorMessage] = useState('');
    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await axios.post('http://localhost:3001/user/register', values);
            if (response.data.status === 'error') {
                setErrors({ general: response.data.message });
            } else {
                navigate('/login');
            }
            setSubmitting(false);
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitting(false);
            if (error.response) {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: '120px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    padding: '30px',
                    textAlign: 'center'
                }}
            >
                <Typography variant='h3' color="wheat">Register</Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field
                                as={TextField}
                                variant="outlined"
                                label="Name"
                                name="name"
                                fullWidth
                                sx={{ marginBottom: '20px' }}
                            />
                            <ErrorMessage name="name" component="div" />
                            <Field
                                as={TextField}
                                variant="outlined"
                                label="Email"
                                type="email"
                                name="email"
                                fullWidth
                                sx={{ marginBottom: '20px' }}
                            />
                            <ErrorMessage name="email" component="div" />
                            <Field
                                as={TextField}
                                variant="outlined"
                                label="Password"
                                type="password"
                                name="password"
                                fullWidth
                                sx={{ marginBottom: '20px' }}
                            />
                            <ErrorMessage name="password" component="div" />
                            <Field
                                as={TextField}
                                variant="outlined"
                                label="Confirm Password"
                                type="password"
                                name="passwordRepeat"
                                fullWidth
                                sx={{ marginBottom: '20px' }}
                            />
                            <ErrorMessage name="passwordRepeat" component="div" />
                            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>Register</Button>
                            {errMessage && <Typography color="error">{errMessage}</Typography>}
                        </Form>
                    )}
                </Formik>
            </Box>
            <Box sx={{
                    marginTop: '20px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    padding: '30px',
                    textAlign: 'center'
                }}><Typography color="wheat"> Do you have account? <Link to='/'>Login here</Link></Typography></Box>
        </Container>
    );
}

export default Register;
