import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography } from '@mui/material';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/product/getProduct/${id}`);
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card variant="outlined" sx={{ width: '50%', boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">Product Details</Typography>
          <Typography variant="h6" gutterBottom align="center">Name: {product.productName}</Typography>
          <Typography variant="body1" align="center">Description: {product.description}</Typography>
          {/* Dodaj inne szczegóły produktu */}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProductDetails;
