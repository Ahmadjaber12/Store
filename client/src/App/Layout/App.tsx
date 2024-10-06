import { useState } from 'react'
import Header from './Header'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Outlet } from 'react-router-dom';

function App() {
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Header darkmode={darkmode} handleThemeChange={handleThemeChange}/>
      <Container>
      <Outlet/>
      </Container>
    
    </ThemeProvider>
  )
}

export default App
