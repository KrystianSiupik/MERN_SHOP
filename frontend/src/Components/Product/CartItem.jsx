import { Grid, Typography, IconButton, Box } from '@mui/material';
import React from 'react';
import img from './../../Img/DungeonsAndDragons.jpg';
import DeleteIcon from '@mui/icons-material/Delete';


function CartItem({ price, itemId, quantity , handleRemoveItem, name}) {



  return (
    <Grid item xs={12}>
      <Box mb={4} boxShadow={2} sx={{color:"wheat",backgroundColor:"#222831"}}>
        <Grid container spacing={2} direction="column">
          <Grid item sx={{ padding: "10px", borderRadius: "10px" }}>
            <Grid container alignItems="center">
              <Grid item sm={4}><img src={img} style={{ width: "100px",marginLeft:"10px"}} alt="product-img" /></Grid>
              <Grid item sm={8}>
                <Grid container spacing={2} direction="row" alignItems="center">
                  <Grid item sm={3}><Typography variant="body1" fontWeight="bold">{name}</Typography></Grid>
                  <Grid item sm={3}><Typography variant="body1" fontWeight="bold">price: {price}$</Typography></Grid>
                  <Grid item sm={3}><Typography variant="body1" fontWeight="bold">quantity: {quantity}</Typography></Grid>
                  <Grid item sm={3}><IconButton color="primary" sx={{marginLeft:"20px"}} onClick={()=> handleRemoveItem(itemId)}><DeleteIcon /></IconButton></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
      </Box>
    </Grid>
  );
}

export default CartItem;
