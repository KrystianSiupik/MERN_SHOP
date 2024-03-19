import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Modal,
  Rating,
  TextField,
  Typography
} from '@mui/material';
import img from './../../Img/DungeonsAndDragons.jpg';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../state';
import AddCommentIcon from '@mui/icons-material/AddComment';
function Product({ productName, ratingsAverage, description, productId, price, setCounter,  }) {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleAddToCart = async () => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      await axios.post('http://localhost:3001/cart/addItem', {
        productId: productId,
        quantity: 1,
        price: price
      }, config);
      
      dispatch(addToCart({ productId, quantity: 1, price }));
      setCounter(prevCounter => prevCounter + 1);
    } catch (error) {
      console.log(error);
    }
  }

  const handleRatingClick = () => {
    setOpenModal(true);
  }

  const handleModalClose = () => {
    setOpenModal(false);
  }

  const handleRatingSubmit = () => {
  
    setOpenModal(false);
  }

  return (
    <Card sx={{ maxWidth: 345, minHeight: 450 }}>
      <CardHeader
        action={
          <IconButton onClick={handleRatingClick}>
            <AddCommentIcon />
          </IconButton>
        }
        title={productName}
        subheader={price + '$'}
      />
      <CardMedia
        component="img"
        height="194"
        image={img}
        alt='book'
      />
      <CardContent>
        <Typography>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton onClick={handleAddToCart} aria-label='add to cart'>
            <AddShoppingCartIcon />
          </IconButton>
        </Box>
        <Rating
          name="simple-controlled"
          value={ratingsAverage}
          precision={0.5}
        />
      </CardActions>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="body2">
          <Link to={`/details/${productId}`}>See more</Link>
        </Typography>
      </Box>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{color:'wheat'}}>
            Add comment 
          </Typography>
          <TextField
            id="comment"
            label="Komentarz"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Rating
            name="simple-controlled"
            value={rating}
            precision={0.5}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleRatingSubmit} variant="contained">Wyślij</Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  )
}

export default Product;
