import { useEffect, useState } from 'react'
import Header from './Header'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import { getCookie } from '../util/util';
import agent from '../api/agent';
import LoadingComponent from './loadingComponent';
import { useAppDispatch } from '../store/configurestore';
import { setbasket } from '../../Features/Basket/BasketSlicer';


function App() {
  const dispatch=useAppDispatch();
  const [loading,setloading]=useState(true);

useEffect(()=>{
  const buyerId=getCookie("buyerId")
  if(buyerId){
    agent.Basket.get().then(basket=>dispatch(setbasket(basket))).catch(err=> console.log(err)
    ).finally(()=>setloading(false));
  }
  else setloading(false);
},[dispatch])

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
