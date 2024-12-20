import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import {ShoppingCart} from '@mui/icons-material';
import { useAppSelector } from "../store/configurestore";
import SignInUser from "./sinInUser";
const midLinks=[
    {title:'catalog',path:'/catalog'},
    {title:'about',path:'/about'},
    {title:'contact',path:'/contact'}
]
const NavStyles={
    color:"inherit",
    textDecoration:"none",
    typography:"h6",
        '&:hover':{
            color:"grey.500"
        },
        "&.active":{
                    color:'text.secondary'
        }
    }
const rightLinks=[
    {title:'login',path:'/login'},
    {title:'register',path:'/register'}
]

interface Props{
    darkmode:boolean;
    handleThemeChange:()=> void;
}


export default function Header({darkmode , handleThemeChange}:Props){
    const {basket}=useAppSelector(state=> state.basket);
    const {user}=useAppSelector(state=> state.account);
    const countItems=basket?.items?.reduce((sum,item)=>sum+item.quentity,0);
    return (
        <AppBar position='static' sx={{mb:4}}>
                     
             <Toolbar sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
             <Box display={"flex"} alignItems={"center"}> 
                <Typography variant='h6' component={NavLink} to='/' sx={NavStyles}>
                  Re-Store
                </Typography>
                <Switch checked={darkmode} onChange={handleThemeChange}/>
                </Box>
                <List sx={{display:"flex"}}>
                {midLinks.map(({title,path})=>
                        <ListItem 
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={NavStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                )}
                </List>
                <Box display={"flex"} alignItems={"center"}>
                <IconButton component={Link} to="/basket" size="large" edge="start" color="inherit" sx={{mr:2}}>
                    <Badge badgeContent={countItems} color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
                {user ? (
                    <SignInUser/>
                ): (<List sx={{display:"flex"}}>
                    {rightLinks.map(({title,path})=>
                            <ListItem 
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={NavStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                    )}
                    </List>)
                
                }
                
                </Box>
            </Toolbar>
        </AppBar>
    )
}