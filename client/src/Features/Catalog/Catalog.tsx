import {  Grid,  Paper } from "@mui/material";
import LoadingComponent from "../../App/Layout/loadingComponent";
import { useAppDispatch, useAppSelector } from "../../App/store/configurestore";
import {   fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlicer";
import ProductList from "./ProductList";
import {  useEffect } from "react";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../Components/RadioButtonGroup";
import CheckButtons from "../../Components/CheckButtons";
import AppPagination from "../../Components/AppPagination";

const sortOptions=[
  {value:'name',label:"Alphabetical"},
  {value:'priceDesc',label:"Price - High to low"},
  {value:'Price',label:"Price - Low to high"},

]

export default function Catalog(){
  const Products = useAppSelector(productSelectors.selectAll)
  const dispatch= useAppDispatch();
  const {productLoaded,filtersLoaded,brands,types,productparams,metaData}=useAppSelector(state=>state.catalog)
  useEffect(()=>{
      if(!productLoaded) dispatch(fetchProductsAsync())    
    }  ,[productLoaded, dispatch])
  useEffect(()=>{
    if(!filtersLoaded) dispatch(fetchFilters());

  },[dispatch,filtersLoaded])

  if (!filtersLoaded || !metaData) return <LoadingComponent message="Loading products..."/> 
    return (
      <Grid container columnSpacing={4}>
            <Grid item xs={3}>
                <Paper sx={{mb:2}}>
                  <ProductSearch/>   
                </Paper>
                <Paper sx={{mb:2,p:2}}>
                    <RadioButtonGroup selectedValue={productparams.orderBy} options={sortOptions} onChange={(e=>dispatch(setProductParams({orderBy:e.target.value})))}/>
              </Paper>

              <Paper sx={{mb:2,p:2}}>

               <CheckButtons 
                items={brands}
                checked={productparams.brands}
                  onChange={(items:string[])=> dispatch(setProductParams({brands:items}))}/>
              </Paper>
              <Paper sx={{mb:2,p:2}}>

              <CheckButtons 
                items={types}
                checked={productparams.types}
                  onChange={(items:string[])=> dispatch(setProductParams({types:items}))}/>
              </Paper>
            </Grid>
            <Grid item xs={9}>
            <ProductList products={Products} />
            </Grid>
            <Grid item xs={3}/>

            <Grid item xs={9}sx={{mb:2}}>
              
              <AppPagination metaData={metaData} 
              onpageChange={(page:number)=> dispatch(setPageNumber({pageNumber:page}))}/>
              </Grid>           
      </Grid>
    )
}