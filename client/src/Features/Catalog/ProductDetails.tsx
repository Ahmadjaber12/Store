import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import NotFound from "../../App/Errors/NotFound";
import LoadingComponent from "../../App/Layout/loadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../App/store/configurestore";
import { addBasketItemAsync, removeBasketItemAsync } from "../Basket/BasketSlicer";
import { fetchProductAsync, productSelectors } from "./catalogSlicer";

export default function ProductPage(){
    const {basket,status}=useAppSelector(state=> state.basket);
    const dispatch=useAppDispatch();
    const {id}=useParams<{id:string}>();
    const product = useAppSelector(state=>productSelectors.selectById(state,+id!))  
    const {status:productStatus}=useAppSelector(state=>state.catalog)
    const [quentity,setQuentity]=useState(0);
    const item=basket?.items.find(i=>i.productId === product?.id);
    
    useEffect(()=>{
        if (item) setQuentity(item.quentity);
        if(!product && id) dispatch(fetchProductAsync(+id!))
        
    },[item,dispatch,id,product]);

    function handleInputChange(event:ChangeEvent<HTMLInputElement>){
        if(parseInt(event.currentTarget.value) >= 0)
        setQuentity(parseInt(event.currentTarget.value));
    }
    function handleUpdateCart(){
        if(!item || quentity> item.quentity) 
           {const updatedQuentity=item ?quentity - item.quentity : quentity
                // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                dispatch(addBasketItemAsync({productId:product?.id!,quentity:updatedQuentity}))}
    
        else{const updatedQuentity=item.quentity -quentity;
            dispatch(removeBasketItemAsync({productId:product!.id,quentity:updatedQuentity}))}
                
            }
    

    if (productStatus.includes('pending')) return <LoadingComponent message="Loading Products..."/>
    if (!product) return <NotFound/>
    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width:"100%"}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3" >{product.name}</Typography>
                <Divider sx={{mb:2}}/>
                <Typography variant="h4" color="secondary">{(product.price /100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>{product.brand}</TableCell>
                            <TableRow>
                            <TableCell>Quentity in stock</TableCell>
                            <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField onChange={handleInputChange} variant="outlined" type="number" label='Quentity in Cart' fullWidth value={quentity}/>
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton loading={status.includes("pending" +item?.productId)}
                        disabled={item?.quentity ===quentity || !item && quentity === 0} 
                        onClick={handleUpdateCart} sx={{height:"55px"}} 
                        color="primary" size="large" variant="contained" fullWidth>
                        {item ? 'Update Quentity' : "Add to Cart"}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}