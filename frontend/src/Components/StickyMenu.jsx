import styled from '@emotion/styled'
import { AppBar, Box, Button, ButtonGroup, Toolbar } from '@mui/material'
import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';


const StyledToolbar = styled(Toolbar)({
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    width:"90%",
})


function StickyMenu() {

  return (
   <AppBar position='sticky' sx={{boxShadow: 'none',display:{xs:"none",md:"block"}}}>
    <StyledToolbar><Box sx={{display:"flex", justifyContent:"space-between", width:"100%", ml:"20%"}}>
    
    <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button >Role-Play Game</Button>
        <Button>Board Games</Button>
        <Button>Paragraph Games</Button>
        <Button>Discount</Button>
        <Button>My account</Button>
     </ButtonGroup>

     <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button startIcon={<FacebookIcon/>}>Facebook</Button>
        <Button startIcon={<YouTubeIcon/>} color='error'>Youtube</Button>
        <Button startIcon={<InstagramIcon />} sx={{ backgroundColor: "#FF69B4", "&:hover": { backgroundColor: "#EE69B4" } }}>Instagram</Button>
    
     </ButtonGroup>
     </Box>
    </StyledToolbar>
   </AppBar>
  )
}

export default StickyMenu