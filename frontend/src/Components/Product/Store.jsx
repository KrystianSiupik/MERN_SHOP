import React, { useEffect, useState } from 'react';
import Product from './Product';
import axios from 'axios';
import { Container, Grid, Select, MenuItem, Slider, Typography, Box } from '@mui/material';

function Store({ setCounter, counter }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [rating, setRating] = useState(0);

  const categories = ['all', 'dice', 'book', 'figure'];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3001/product/getProducts');
        setProducts(response.data.product);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'all' && product.type !== selectedCategory) {
      return false;
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    if (rating > 0 && product.ratingsAverage < rating) {
      return false;
    }
    return true;
  });

  return (
    <Container>
      <Grid container direction="row" spacing={3} sx={{ marginTop: "20px" }}>
        <Grid item xs={12} sx={{ marginBottom: "20px" }}>
          <Box sx={{ backgroundColor: '#222831', padding: '20px', borderRadius: '5px' }}>
          <Select  sx={{color:"wheat"}} value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <MenuItem  key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
          <Typography variant="body1" color="wheat">Price Range:</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
          />
          <Typography variant="body1" color="wheat">Rating:</Typography>
          <Slider
          
            value={rating}
            onChange={handleRatingChange}
            valueLabelDisplay="auto"
            min={0}
            max={5}
            step={1}
          />
          </Box>
        </Grid>
        {filteredProducts.map(product => (
          <Grid item xs={12} md={4} key={product._id}>
            <Product productId={product._id} price={product.price}
              productName={product.productName} description={product.description}
              ratingsAverage={product.ratingsAverage}
              setCounter={setCounter} counter={counter} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Store;
