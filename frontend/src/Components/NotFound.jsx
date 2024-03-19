import React from 'react';
import { Box, Typography } from '@mui/material';

function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
      }}
    >
      <Typography variant="h1" align="center" color="wheat">
        NotFound
      </Typography>
    </Box>
  );
}

export default NotFound;
