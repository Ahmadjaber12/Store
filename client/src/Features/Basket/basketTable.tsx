import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { removeBasketItemAsync, addBasketItemAsync } from "./BasketSlicer";
import { useAppSelector, useAppDispatch } from "../../App/store/configurestore";
import { BasketItem } from "../../App/Models/Basket";

interface Props{
    items: BasketItem[];
    isBasket?:boolean
}

export default function BasketTable({items,isBasket=true}:Props){
    const {status}=useAppSelector(state=> state.basket)
    const dispatch=useAppDispatch();
    return(
<TableContainer component={Paper}>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
    <TableRow>
      <TableCell>Product</TableCell>
      <TableCell align="right">Price</TableCell>
      <TableCell align="right">Quentity</TableCell>
      <TableCell align="right">Subtotal</TableCell>
      {isBasket &&
      <TableCell align="right"></TableCell>}
    </TableRow>
  </TableHead>
  <TableBody>
    {items?.map( item => (
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
        {isBasket &&
            <LoadingButton loading={status==='pendingRemoveItem'+item.productId+'rem'}  onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId,quentity:1,name:"rem"}))}  color="error">
              <Remove />
            </LoadingButton>} 
          {item.quentity}
          {isBasket &&
          <LoadingButton loading={status === 'pendingAddItem'+item.productId} onClick={()=>dispatch(addBasketItemAsync({productId:item.productId}))} color="error">
          <Add />
            </LoadingButton>}
          </TableCell>
        <TableCell align="right">${((item.price/100) * item.quentity).toFixed(2)}</TableCell>
        {isBasket &&
        <TableCell align="right">
        <LoadingButton loading={status === 'pendingRemoveItem'+item.productId+"del"} onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId,quentity:item.quentity,name:"del"}))}  color="error">
        <Delete />
            </LoadingButton>
          </TableCell>}
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer >
    )
}

