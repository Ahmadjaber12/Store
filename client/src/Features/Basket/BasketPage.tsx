import { Button, Grid, Typography } from "@mui/material";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../App/store/configurestore";
import BasketTable from "./basketTable";

export default function Basketpage(){
  const {basket}=useAppSelector(state=> state.basket)



if(!basket) return <Typography variant="h3">Your basket is empty</Typography>
console.log(basket);


    return (
      <>
   <BasketTable items={basket.items}/>
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