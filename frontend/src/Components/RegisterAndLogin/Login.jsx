import axios from 'axios';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { setLogin } from '../../state';
import { Link, useNavigate } from 'react-router-dom';

const initialValues = {
    email: "",
    password: ""
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('This field is required'),
    password: Yup.string().required('This field is required')
});

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState('');

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:3001/user/login', values);
            if (response.data.status === 'failed') {
                setErrors(response.data.message);
            } else {
                const { name } = response.data.user;
                const { token } = response.data;
                dispatch(setLogin({ name: name, token: token }));
                navigate('/store');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

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
                <Typography variant="h4" gutterBottom color="wheat"> Login</Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <Field
                                    as={TextField}
                                    variant="outlined"
                                    label="Email"
                                    name="email"
                                    fullWidth
                                    autoComplete="email"
                                />
                                <ErrorMessage name='email' component="div" />
                            </Grid>
                            <Grid item>
                                <Field
                                    as={TextField}
                                    variant="outlined"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    fullWidth
                                    autoComplete="current-password"
                                />
                                <ErrorMessage name='password' component="div" />
                            </Grid>
                            <Grid item>
                                <Button type='submit' variant="contained" color="primary">Login</Button>
                            </Grid>
                        </Grid>
                        {errors && <Typography color="error">{errors}</Typography>}
                    </Form>
                </Formik>
            </Box>
            <Box sx={{
                    marginTop: '20px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    padding: '30px',
                    textAlign: 'center'
                }}><Typography color="wheat">You don't have an account? <Link to='/register'>Register here</Link></Typography></Box>
        </Container>
    );
}

export default Login;
