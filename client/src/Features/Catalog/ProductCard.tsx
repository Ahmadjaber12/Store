import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../App/Models/products";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../App/store/configurestore";
import { addBasketItemAsync } from "../Basket/BasketSlicer";

interface Props{
    product:Product;
}
export default function ProductCard({product}:Props){
  const {status}=useAppSelector(state=> state.basket)
  const dispatch=useAppDispatch();



    return (

        <Card >
          <CardHeader 
          avatar={
            <Avatar sx={{bgcolor:"secondary.main"}}>
              {product.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={product.name}
          titleTypographyProps={{sx:{fontWeight:"bold",color:"primary.main"}}}
          />

        <CardMedia
          sx={{ height: 140 ,backgroundSize:"contain",bgcolor:"primary.light"}}
          image={product.pictureUrl}
          title={product.name}
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" color="secondary" >
            ${(product.price /100).toFixed(2) }
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton loading={status==='pendingAddItem'+product.id}
          onClick={()=>dispatch(addBasketItemAsync({productId:product.id}))}  size="small">Add to Cart</LoadingButton>
          <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
        </CardActions>
      </Card> )
}