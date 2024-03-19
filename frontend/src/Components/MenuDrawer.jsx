import React from 'react';
import styled from '@emotion/styled';
import { Button, ButtonGroup, Drawer} from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import DiscountIcon from '@mui/icons-material/Discount';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

const StyledDrawer = styled(Drawer)({
  width: '300px',
  backgroundColor: 'transparent',
  padding: '16px',
});

const DrawerContent = styled('div')({
  width: '200px', 
  padding: '16px',
});

const StyledButtonGroup = styled(ButtonGroup)({
    flexDirection: 'column',
    
    '& .MuiButton-root': {
      border: 'none',
      borderRadius: '0',
      marginBottom: '10px'
    },
  });

const MenuDrawer = ({isOpen, handleDrawerClose}) => {

  return (
    <StyledDrawer anchor='left' variant='temporary' open={isOpen} onClose={handleDrawerClose}>
      <DrawerContent>
      <StyledButtonGroup  variant="text" aria-label="Basic button group">
        <Button startIcon={<CasinoIcon/>}>Gry Fabularne</Button>
        <Button startIcon={<CasinoIcon/>}>Gry Planszowe</Button>
        <Button startIcon={<CasinoIcon/>}>Gry Paragrafowe</Button>
        <Button startIcon={<DiscountIcon/>}>Promocje</Button>
       <Link to={'/dashboard'}> <Button startIcon={<PersonIcon/>}>My account</Button></Link>
     </StyledButtonGroup >
      </DrawerContent>
    </StyledDrawer>
  );
};

export default MenuDrawer;
