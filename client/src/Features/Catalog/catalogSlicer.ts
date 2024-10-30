import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../App/Models/products";
import agent from "../../App/api/agent";
import { RootState } from "../../App/store/configurestore";
import { MetaData } from "../../App/Models/Pagination";


interface catalogState{
    productLoaded:boolean,
    filtersLoaded:boolean,
    status:string,
    brands:string[],
    types:string[],
    productparams:ProductParams,
    metaData:MetaData | null
}

const productAdapter= createEntityAdapter<Product>();

function getAxiosParams(productparams:ProductParams){
    const params=new URLSearchParams();
    params.append('pageNumber',productparams.pageNumber.toString());
    params.append('pageSize',productparams.pageSize.toString());
    params.append('orderBy',productparams.orderBy);
    if(productparams.searchTerm) params.append('searchTerm',productparams.searchTerm)
    if(productparams.brands.length > 0) params.append('brands',productparams.brands!.toString());
    if(productparams.types.length > 0) params.append('types',productparams.types!.toString());

    return params;

}
  
export const fetchProductsAsync =createAsyncThunk<Product[],void,{state:RootState}>(

    'catalog/fetchProductsAsync',
    async (_,thunkAPI) => {
        const params=getAxiosParams(thunkAPI.getState().catalog.productparams);

        try{
            const response=await agent.catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
            return response.items ;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch(error:any){
            return thunkAPI.rejectWithValue({error:error.data});
            
        }
    }
)

export const fetchFilters=createAsyncThunk(
    'catalog/fetchFilters',
    async(_,thunkAPI)=>{
        try{
            return agent.catalog.filtersfetch();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch(error:any){
            return thunkAPI.rejectWithValue({error:error.data})
        }
    }
)

export const fetchProductAsync =createAsyncThunk<Product,number>(

    'catalog/fetchProductAsync',
    async (productId,thunkAPI)=>{
        try{
            return await agent.catalog.details(productId)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch(error:any){
            return thunkAPI.rejectWithValue({error:error.data});            
        }
    }
)
function initParams(){
    return{
        pageNumber:1,
        pageSize:6,
        orderBy:"name",
        brands:[],
        types:[]
    }
}
export const catalogSlice=createSlice({
    name:"catalog",
    initialState:productAdapter.getInitialState<catalogState>({
        productLoaded:false,
        filtersLoaded:false,
        status:"idle",
        brands:[],
        types:[],
        productparams:initParams(),
        metaData:null
    }),
    reducers:{
        setProductParams:(state,action)=>{
                state.productLoaded=false
                state.productparams={...state.productparams,...action.payload,pageNumber:1}
    },
        setPageNumber:(state,action)=>{
            state.productLoaded=false
            state.productparams={...state.productparams,...action.payload}
        },
    setMetaData:(state,action)=>{
        state.metaData=action.payload;
    },
        resetProductParams:(state)=>{
            state.productparams=initParams()
        }
    

},
    extraReducers:(builder =>{
        
        builder.addCase(fetchProductsAsync.pending,(state) =>{
            state.status="pendingFetchProducts";
        });
        builder.addCase(fetchProductsAsync.fulfilled,(state,action)=>{
            productAdapter.setAll(state,action.payload)
            state.status="idle";
            state.productLoaded=true
        });
        builder.addCase(fetchProductsAsync.rejected,(state)=>{

            state.status="idle";
        }); 
        builder.addCase(fetchProductAsync.pending,(state)=>{
            state.status="pendingFetchProduct";
        }); 
        builder.addCase(fetchProductAsync.fulfilled,(state,action)=>{
            productAdapter.upsertOne(state,action.payload);
            state.status='idle'
        }); 
        builder.addCase(fetchProductAsync.rejected,(state,action)=>{

            console.log(action);
            state.status="idle";
        }); 
        builder.addCase(fetchFilters.pending,(state)=>{
            state.status="pendingfetchFilters";
        });
        builder.addCase(fetchFilters.fulfilled,(state,action)=>{
            state.brands= action.payload.brands;
            state.types=action.payload.types;
            state.filtersLoaded=true;   
            state.status="idle"
        });
        builder.addCase(fetchFilters.rejected,(state)=>{
            state.status="idle";
        }); 
    })
})

export const productSelectors=productAdapter.getSelectors((state:RootState)=> state.catalog);

export const {setProductParams,resetProductParams,setMetaData,setPageNumber}=catalogSlice.actions;    