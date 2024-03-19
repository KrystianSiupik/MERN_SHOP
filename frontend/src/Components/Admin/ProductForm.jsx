import axios from 'axios';
import { Box, Button, Container, Grid, Snackbar, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

const initialValues = {
    productName: '',
    age: '',
    type: '',
    players: '',
    language: '',
    description: '',
    genre: '',
    price: '',
    pages: '',
    cover: '',
    format: '',
    print: ''
}

const validationSchema = Yup.object().shape({
    productName: Yup.string().required('Product name is required'),
    age: Yup.string(),
    type: Yup.string(),
    players: Yup.string(),
    language: Yup.string(),
    description: Yup.string(),
    genre: Yup.string(),
    price: Yup.string(),
    pages: Yup.string(),
    cover: Yup.string(),
    format: Yup.string(),
    print: Yup.string()
});

function ProductForm() {
    const [errors, setErrors] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    const token = useSelector(state => state.auth.token);
    const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }}
    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            console.log(values);
            const response = await axios.post('http://localhost:3001/product/getProducts', values, config);
            console.log(response.data);
            setSuccessMessage('Product added successfully!');
            setOpenSnackbar(true);
            resetForm();
        } catch (error) {
            console.error('Error adding product:', error);
            setErrors('Failed to add product. Please try again.');
        }
        setSubmitting(false);
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
                <Typography variant="h4" gutterBottom sx={{color:"wheat"}}>Add Product</Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <Grid container spacing={2} direction="column">
                            <Grid item>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        label="Type"
                                        name="type"
                                        select
                                        fullWidth
                                        autoComplete="type"
                                        SelectProps={{ native: true }}
                                        onChange={(e) => {
                                            setFieldValue('type', e.target.value);
                                        }}
                                    >
                                        <option value="book">Book</option>
                                        <option value="dice">Dice</option>
                                        <option value="figure">Figure</option>
                                    </Field>
                                    <ErrorMessage name='type' component="div" />
                                </Grid>
                                <Grid item>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        label="Product Name"
                                        name="productName"
                                        fullWidth
                                        autoComplete="productName"
                                    />
                                    <ErrorMessage name='productName' component="div" />
                                </Grid>
                                <Grid item>
                                  
                                            <Field
                                                as={TextField}
                                                variant="outlined"
                                                label="Price"
                                                name="price"
                                                fullWidth
                                                autoComplete="price"
                                            />
                                            <ErrorMessage name='price' component="div" />
                                        
                                   
                                </Grid>
                                
                                <Grid item>
                                    {values.type === 'book' && (
                                        <>
                                            <Field
                                                as={TextField}
                                                variant="outlined"
                                                label="Players"
                                                name="players"
                                                fullWidth
                                                autoComplete="players"
                                            />
                                            <ErrorMessage name='players' component="div" />
                                        </>
                                    )}
                                </Grid>
                                <Grid item>
                                    {values.type === 'book' && (
                                        <>
                                            <Field
                                                as={TextField}
                                                variant="outlined"
                                                label="Cover"
                                                name="cover"
                                                fullWidth
                                                autoComplete="cover"
                                            />
                                            <ErrorMessage name='cover' component="div" />
                                        </>
                                    )}
                                </Grid>
                               
                                <Grid item>
                                    {values.type === 'book' && (
                                        <>
                                            <Field
                                                as={TextField}
                                                variant="outlined"
                                                label="Description"
                                                name="description"
                                                fullWidth
                                                autoComplete="description"
                                            />
                                            <ErrorMessage name='description' component="div" />
                                        </>
                                    )}
                                </Grid>
                                <Grid item>
                                    {values.type === 'book' && (
                                        <>
                                            <Field
                                                as={TextField}
                                                variant="outlined"
                                                label="Genre"
                                                name="genre"
                                                fullWidth
                                                autoComplete="genre"
                                            />
                                            <ErrorMessage name='genre' component="div" />
                                        </>
                                    )}
                                </Grid>
                                <Grid item>
                                    {values.type === 'book' && (
                                        <>
                                            <Field
                                                as={TextField}
                                                variant="outlined"
                                                label="Language"
                                                name="language"
                                                fullWidth
                                                autoComplete="language"
                                            />
                                            <ErrorMessage name='language' component="div" />
                                        </>
                                    )}
                                </Grid>
                            
                                <Grid item>
                                    {values.type === 'book' && (
                                        <>
                                            <Field
                                                as={TextField}
                                                type="number"
                                                variant="outlined"
                                                label="Pages"
                                                name="pages"
                                                fullWidth
                                                autoComplete="pages"
                                            />
                                            <ErrorMessage name='pages' component="div" />
                                        </>
                                    )}
                                </Grid>
                                <Grid item>
                                    {values.type === 'book' && (
                                        <>
                                            <Field
                                                as={TextField}
                                                variant="outlined"
                                                label="Format"
                                                name="format"
                                                fullWidth
                                                autoComplete="format"
                                            />
                                            <ErrorMessage name='format' component="div" />
                                        </>
                                    )}
                                </Grid>
                                <Grid item>
                                    {values.type === 'book' && (
                                        <>
                                            <Field
                                                as={TextField}
                                                variant="outlined"
                                                label="Print"
                                                name="print"
                                                fullWidth
                                                autoComplete="print"
                                            />
                                            <ErrorMessage name='print' component="div" />
                                        </>
                                    )}
                                </Grid>
                                <Grid item>
                                    <Button type='submit' variant="contained" color="primary">Add Product</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message={successMessage}
                />
            </Box>
        </Container>
    );
}

export default ProductForm;
