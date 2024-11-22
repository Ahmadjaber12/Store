import { Box, Button, Grid, Typography } from "@mui/material";
import { order } from "../../App/Models/order";
import BasketTable from "../Basket/basketTable";
import { BasketItem } from "../../App/Models/Basket";
import BasketSummary from "../Basket/BasketSummary";

interface Props{
    order:order;
    setSelectedOrder:(id:number)=>void
}
export default function OrderDetail({order,setSelectedOrder}:Props){
    const subtotal=order.items.reduce((sum,item)=>sum+(item.price*item.quentity),0) ?? 0;

    return(
        <>
            <Box display="flex" justifyContent='space-between'>
                <Typography sx={{p:2}} gutterBottom variant="h4" >order#{order.id}-{order.orderStatus}</Typography>
                <Button onClick={()=>setSelectedOrder(0)} sx={{m:2}} size="large" variant="contained">Back to orders</Button>

            </Box>
            <BasketTable items={order.items as BasketItem[]} isBasket={false}/>
            <Grid container>
                <Grid item xs={6}/>
                    <Grid item xs={6}>
                        <BasketSummary subtotal={subtotal}/>
                    </Grid>
            </Grid>
        </>
    )
}