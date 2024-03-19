import React, { useState } from 'react';
import { Box, Drawer, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import ReportIcon from '@mui/icons-material/Report';
import SettingsIcon from '@mui/icons-material/Settings';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, AreaChart, Area } from 'recharts';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

function AdminDashBoard() {
  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

  const [showProductOptions, setShowProductOptions] = useState(false);

  const toggleProductOptions = (show) => {
    setShowProductOptions(show);
  };

  return (
    <Box sx={{ display: 'flex' }}>
 <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem 
            button
            onMouseEnter={() => toggleProductOptions(true)}
            onMouseLeave={() => toggleProductOptions(false)}
          >
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          {showProductOptions && (
            <Box ml={2} 
            onMouseEnter={() => toggleProductOptions(true)}
            onMouseLeave={() => toggleProductOptions(false)}>
              <ListItem button>
                <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
              <Link to='/productForm'> <ListItemText primary="Add Product" /></Link> 
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Modify Product" />
              </ListItem>
            </Box>
          )}
          <ListItem button>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Typography variant="h4" gutterBottom color="wheat">
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <Box sx={{ bgcolor: 'info.main', color: 'white', p: 2, m: 1, width: 200 }}>
            <Typography variant="h6" gutterBottom>
              Products
            </Typography>
            <Typography variant="h4" gutterBottom>
              10
            </Typography>
          </Box>
          <Box sx={{ bgcolor: 'success.main', color: 'white', p: 2, m: 1, width: 200 }}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <Typography variant="h4" gutterBottom>
              5
            </Typography>
          </Box>
          <Box sx={{ bgcolor: 'warning.main', color: 'white', p: 2, m: 1, width: 200 }}>
            <Typography variant="h6" gutterBottom>
              Customers
            </Typography>
            <Typography variant="h4" gutterBottom>
              20
            </Typography>
          </Box>
          <Box sx={{ bgcolor: 'error.main', color: 'white', p: 2, m: 1, width: 200 }}>
            <Typography variant="h6" gutterBottom>
              Reports
            </Typography>
            <Typography variant="h4" gutterBottom>
              3
            </Typography>
          </Box>
      
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box mt={5}>
              <Typography variant="h6" gutterBottom color="wheat">
                Chart 1
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeDasharray="5 5" />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box mt={5}>
              <Typography variant="h6" gutterBottom color="wheat">
                Chart 2
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AdminDashBoard;
