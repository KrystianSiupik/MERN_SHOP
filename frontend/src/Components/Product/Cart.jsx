import { Container, Typography, Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { removeFromCart } from '../../state';
import { Link } from 'react-router-dom';


function Cart({ setCounter, counter }) {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const token = useSelector(state => state.auth.token);

  
  let delivery = 15;

  const dispatch = useDispatch();

  const fetchCart = async () => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.get('http://localhost:3001/cart/getCart', config);
      setUserId(response.data.cart.userId);
      setProducts(response.data.cart.items);
   
    } catch (error) {
      console.log(error);
    }
  }; 

  useEffect(() => {
    fetchCart();
  }, [dispatch]);

  const handleRemoveItem = async (itemId) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    try {
       await axios.delete(`http://localhost:3001/cart/removeItem/${itemId}`, config);
       const updatedProducts = products.filter(item => item._id !== itemId);
       dispatch(removeFromCart({ productId: itemId }));
      
    } catch (error) {
      console.error(error);
    }

    fetchCart();
  }

  const totalPrice = parseFloat(products.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2));
  const deliveryAsNumber = parseFloat(delivery.toFixed(2));
  const totalPriceWithDelivery = totalPrice + deliveryAsNumber;

  return (
    <Container maxWidth="md" sx={{ marginTop: '120px' }}>
      {products.length === 0 ? (
  <Box sx={{ 
    boxShadow: 2, 
    padding: '20px', 
    borderRadius: '5px', 
    backgroundColor: 'wheat'
  }}>
    <Typography variant="h6" textAlign="center">We found no products in your cart!</Typography>
    <Typography textAlign="center">Return to  <Link to={'/store'}>home page</Link> to continue shopping.</Typography>
  </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={8}>
             {products.map((item) => (
               <CartItem 
                 key={item._id} 
                 itemId={item.productId && item.productId._id} 
                 quantity={item.quantity}
                 name={item.productName}
                 price={item.price} 
                 userId={userId} 
                 handleRemoveItem={handleRemoveItem}
               />
             ))}
          </Grid>
          <Grid item xs={3} md={4} container alignItems="center" justifyContent="center" >
            <Box boxShadow={2} sx={{ padding: "10px", borderRadius: "5px", color:"wheat",backgroundColor:"#222831" }} > 
              <Grid container spacing={6} >
                <Grid item xs={6}  container direction="column" >
                  <Typography>Price</Typography>
                  <Typography>Delivery</Typography>
                  <Typography>Summary</Typography>
                </Grid>
                <Grid item xs={6}  container direction="column">
                  <Typography>{totalPrice.toFixed(2)+"$"}</Typography>
                  <Typography>{deliveryAsNumber.toFixed(2)+"$"}</Typography>
                  <Typography>{totalPriceWithDelivery.toFixed(2)+"$"}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Cart;
