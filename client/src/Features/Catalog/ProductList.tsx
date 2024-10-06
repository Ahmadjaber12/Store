import {  Grid } from "@mui/material"
import { Product } from "../../products"
import ProductCard from "./ProductCard";

interface Props{
    products:Product[];
}
    export default function Productlist({products}:Props){
        return(
        <Grid container spacing={4}>
                 {products.map(product => (
                <Grid item xs={3} key={product.id} >
               <ProductCard product={product}/>
               </Grid>
                ))}
         </Grid>
        )
    }


