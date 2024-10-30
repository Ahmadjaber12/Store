import {  Grid } from "@mui/material"
import { Product } from "../../App/Models/products"
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../App/store/configurestore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props{
    products:Product[];
}
    export default function Productlist({products}:Props){
        const {productLoaded}=useAppSelector(state=> state.catalog)
        return(
        <Grid container spacing={4}>
                 {products.map(product => (
                <Grid item xs={4} key={product.id} >
                    {!productLoaded ? (<ProductCardSkeleton/>): 
                    (<ProductCard product={product}/> )}                    
               </Grid>
                ))}
         </Grid>
        )
    }


