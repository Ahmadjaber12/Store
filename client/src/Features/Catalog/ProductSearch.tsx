import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../App/store/configurestore";
import { setProductParams } from "./catalogSlicer";
import { useState } from "react";


export default function ProductSearch(){
    
    const {productparams}=useAppSelector(state=> state.catalog);
    const [searchTerm,setsearchTerm]=useState(productparams.searchTerm)
    const dispatch=useAppDispatch();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const debouncedSearch=debounce((event:any)=>{
        dispatch(setProductParams({searchTerm:event.target.value}))
    },1400)

    return(
        <TextField
                    label="Search products" variant="outlined" fullWidth value={searchTerm || ''} 
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(event:any) => 
                        {setsearchTerm(event.target.value);
                        debouncedSearch(event);
                    }}/>
                    
    )
}