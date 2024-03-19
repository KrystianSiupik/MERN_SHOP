import { GlobalStyles, ThemeProvider, createTheme } from "@mui/material";
import Navbar from "./Components/Navbar";
import StickyMenu from "./Components/StickyMenu";
import Register from "./Components/RegisterAndLogin/Register";
import Login from "./Components/RegisterAndLogin/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Store from "./Components/Product/Store";
import Cart from "./Components/Product/Cart";
import Dashboard from "./Components/Admin/dashboard";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import AdminDashBoard from "./Components/Admin/AdminDashBoard";
import ProductForm from "./Components/Admin/ProductForm";
import ProductDetails from "./Components/Product/ProductDetails";
import NotFound from "./Components/NotFound";

function App() {

  

  const [counter, setCounter] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);


  const [isDark, setIsDark] = useState('dark');
  const toggleDark = ()=>{
    if(isDark==='dark')
    {
      setIsDark('light')
    }
    else{
      setIsDark('dark')
    }
    
  }

  const token = useSelector(state => state.auth.token);
  const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
  };
  
  useEffect(() => {
      async function fetchDashBoard() {
          try {
              const getDash = await axios.get('http://localhost:3001/user/adminDashboard', config);
              setIsAdmin(getDash.data.validate);
          } catch (error) {
              console.error(error);
          }
      }

      fetchDashBoard();
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: `${isDark}`, 
    },
    typography:{
      fontFamily:  '"Roboto Slab", sans-serif',
    }
  });
  return (
 
        <><Router>
          <ThemeProvider theme={darkTheme}>
          <GlobalStyles styles={{ body: { backgroundColor: darkTheme.palette.background.default } }} />
        <Navbar isDark={isDark} toggleDark={toggleDark}  counter={counter} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
        <StickyMenu/>
    
          <Routes>
          <Route path="/cart" element={<Cart setCounter={setCounter} counter={counter}/>}/>
          <Route path="/store" element={<Store setCounter={setCounter} counter={counter}/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={isAdmin ? <AdminDashBoard />: <Dashboard/>}/>
          <Route path="/productForm" element={isAdmin && <ProductForm/>}/>
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </ThemeProvider>
  </Router>
  </>
   
  );
}

export default App;
