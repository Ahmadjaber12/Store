import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Delete, Remove } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../App/store/configurestore";
import {  addBasketItemAsync, removeBasketItemAsync } from "./BasketSlicer";

export default function Basketpage(){
  const {basket,status}=useAppSelector(state=> state.basket)
  const dispatch=useAppDispatch();



if(!basket) return <Typography variant="h3">Your basket is empty</Typography>
console.log(basket);


    return (
      <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quentity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map( item => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                  <img src={item.pictureUrl} alt={item.name}style={{height:50, marginRight:20}} />
                  <span>{item.name}</span>
                  </Box>
              </TableCell>
              <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
              <TableCell align="center">
                  <LoadingButton loading={status==='pendingRemoveItem'+item.productId+'rem'}  onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId,quentity:1,name:"rem"}))}  color="error">
                    <Remove />
                  </LoadingButton>
                {item.quentity}
                <LoadingButton loading={status === 'pendingAddItem'+item.productId} onClick={()=>dispatch(addBasketItemAsync({productId:item.productId}))} color="error">
                <Add />
                  </LoadingButton>
                </TableCell>
              <TableCell align="right">${((item.price/100) * item.quentity).toFixed(2)}</TableCell>
              <TableCell align="right">
              <LoadingButton loading={status === 'pendingRemoveItem'+item.productId+"del"} onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId,quentity:item.quentity,name:"del"}))}  color="error">
              <Delete />
                  </LoadingButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
    <Grid container>
    <Grid item xs={6}/>
    <Grid item xs={6}>
      <BasketSummary/>
      <Button 
      component={Link}
      to="/checkout"
      variant="contained"
      size="large"
      fullWidth
      >Checkout</Button>
    </Grid>
    </Grid>
    </>
    )
}