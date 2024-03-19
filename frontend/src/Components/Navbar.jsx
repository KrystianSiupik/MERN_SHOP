import { AppBar, Badge, Box, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, List, ListItem, Button } from '@mui/material';
import React, { useState} from 'react';
import PersonIcon from '@mui/icons-material/Person';
import styled from '@emotion/styled';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from './../Img/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutButton from './LogoutButton';
import axios from 'axios';
import { useSelector } from 'react-redux';
import MenuDrawer from './MenuDrawer'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "90%"
});

const CustomBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
});

const Search = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  padding: '0 10px',
  borderRadius: '25px',
  width: '30%',

}));

const Icon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignContent: "center",
  gap: "20px"
}));

function Navbar({ isAdmin, setIsAdmin, isDark, toggleDark}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const token = useSelector(state => state.auth.token);

 
  const [isOpen, setIsOpen] = useState(false);

  const cart = useSelector(state => state.auth.cart);
  const cartItemsCount = cart ? cart.reduce((total, product) => total + product.quantity, 0) : 0;


  
  const handleDrawerClose = () => {
    setIsOpen(false);
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = async (event) => {
    const searchValue = event.target.value.trim();
    setSearchQuery(searchValue);
    if (searchValue === '') {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3001/product/search?query=${searchValue}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSearchResults(response.data.product);
   
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <>
      <AppBar position='relative'>
        <StyledToolbar >
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Link to="/store"><img src={logo} width={100} alt="logo" /></Link>
          </Box>
          <Icon>
          {!isAdmin &&  <MenuIcon sx={{display: {md:"none", sm:"block"}}} onClick={()=>setIsOpen(true)}/>}
          </Icon>
          <Search >
            <InputBase
              placeholder='Search'
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{color:"black"}}
            />
            
          </Search>
          {searchResults && searchResults.length > 0 && (
              <List sx={{ position: 'absolute', width: '35%', top: '80%', left: '15%', zIndex: 1150 ,backgroundColor: (theme) => theme.palette.background.default}}>
                {searchResults.map(product => (
                  <ListItem key={product._id}>
                    <Box sx={{ width: '100%', marginBottom: '8px' , backgroundColor:"white"}}>
                      <Button component={Link} to={`/details/${product._id}`} variant="outlined" fullWidth>
                        {product.productName}
                      </Button>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
          <CustomBox sx={{ display: { xs: "none", md: "block" } }}>
            <Typography variant='h6'>Write to me</Typography>
            <Typography variant='body2' >krystian.p.siupik@wp.pl</Typography>
          </CustomBox>
          <CustomBox sx={{ display: { xs: "none", md: "block" } }}>
            <Typography variant='h6'>Call</Typography>
            <Typography variant='body2' sx={{ fontWeight: "100" }}>+48 576 062 748</Typography>
          </CustomBox>
          <Icon>
            <Link to="/cart">
              <Badge badgeContent={cartItemsCount} color='error'>
                <IconButton><ShoppingCartIcon /></IconButton>
              </Badge>
            </Link>
            <IconButton onClick={handleMenuOpen}>
              <PersonIcon />
            </IconButton>
            <Menu
              id="user-profile-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
             <Link to={'/dashboard'}> <MenuItem onClick={handleMenuClose}>Zarządzaj</MenuItem></Link>
              <MenuItem onClick={handleMenuClose}>Wyloguj</MenuItem>
            </Menu>
            {isAdmin && <Link to="/dashboard"><IconButton> <DashboardIcon /></IconButton> </Link>}
            <Link to="/store"> <IconButton> <HomeIcon /> </IconButton></Link>
            {isDark==="dark" ?<IconButton onClick={toggleDark}> <WbSunnyIcon/></IconButton> : <IconButton onClick={toggleDark}><DarkModeIcon/></IconButton>}
          </Icon>
          
          <Link to='/'> <LogoutButton setIsAdmin={setIsAdmin} /></Link>
        </StyledToolbar>
      </AppBar>
      {!isAdmin &&  <MenuDrawer isOpen={isOpen} handleDrawerClose={handleDrawerClose}/>}
    </>
  );
}

export default Navbar;
