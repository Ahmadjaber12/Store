import { Button, Menu, Fade, MenuItem } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/configurestore";
import { signOut } from "../../Features/Account/accountSlice";
import { clearBasket } from "../../Features/Basket/BasketSlicer";
import { Link } from "react-router-dom";

export default function SignInUser(){
        const dispatch=useAppDispatch();
        const {user}=useAppSelector(state=>state.account);
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleClick = (event:any) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };
      
        return (
          <>
            <Button color="inherit"
              onClick={handleClick} sx={{typography:"h6"}}
            >
              {user?.email}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem component={Link} to='/orders'>My orders</MenuItem>
              <MenuItem onClick={()=>{
                dispatch(signOut())
                dispatch(clearBasket())
                }}>Logout</MenuItem>
            </Menu>
          </>
        );
}