import { useCallback, useEffect, useState } from 'react'
import Header from './Header'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import LoadingComponent from './loadingComponent';
import { useAppDispatch } from '../store/configurestore';
import { fetchBasketAsync } from '../../Features/Basket/BasketSlicer';
import { fetchCurrentUser } from '../../Features/Account/accountSlice';


function App() {
  const dispatch=useAppDispatch();
  const [loading,setloading]=useState(true);

  const initApp= useCallback(async ()=> {
    try{
        await dispatch(fetchCurrentUser())
        await dispatch(fetchBasketAsync())
    }
    catch(error){
      console.log(error);
      
    }
  },[dispatch])

useEffect(()=>{
  initApp().then(()=> setloading(false))
},[initApp])

const [darkmode,setDarkMode]=useState(false);
const paletteType=darkmode ? "dark" : "light" 
const theme=createTheme({
  palette:{
    mode:paletteType,
    background:{default:paletteType==="light" ? "#eaeaea" : "#121212"}
  }
})
function handleThemeChange(){
  setDarkMode(!darkmode)
}
if(loading) return <LoadingComponent message='Initialising app...'/>
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme='colored'/>
      <CssBaseline/>
      <Header darkmode={darkmode} handleThemeChange={handleThemeChange}/>
      <Container>
      <Outlet/>
      </Container>
    
    </ThemeProvider>
  )
}

export default App
