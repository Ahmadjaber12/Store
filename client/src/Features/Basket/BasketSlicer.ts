import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Basket } from "../../App/Models/Basket";
import agent from "../../App/api/agent";
import { getCookie } from "../../App/util/util";

interface BasketState{
    basket : Basket | null;
    status:string
}

const initialState : BasketState={
        basket:null,
        status:"idle"
}
export const fetchBasketAsync= createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async(_,thunkAPI)=>{
            try{
               return await agent.Basket.get();
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            catch(error:any ){
                return thunkAPI.rejectWithValue({error:error.data});

            }
    },
    {condition:()=>{
        if(!getCookie('buyerId')) return false;
    }}
)
export const addBasketItemAsync=createAsyncThunk<Basket,{productId:number,quentity?:number}>(
"basket/addBasketItemAsync",
async ({productId,quentity},thunkAPI) => {
    try{
        return await agent.Basket.addItem(productId,quentity)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error:any){
       return thunkAPI.rejectWithValue({error:error.data});
        
    }
}
)
export const removeBasketItemAsync=createAsyncThunk<void, {productId:number,quentity:number,name?:string}>(
    "basket/removeBasketItemAsync",
    async({productId,quentity},thunkAPI)=>{
        try{
            await agent.Basket.RemoveItem(productId,quentity);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }catch(error:any){
            return thunkAPI.rejectWithValue({error:error.data});
            
        }
    }
)
export const basketSlicer=createSlice({
    name:"basket",
    initialState,
    reducers:{
        setbasket:(state,action)=>{
            state.basket=action.payload
        },
        clearBasket:(state)=>{
            state.basket=null;
        }
    },
    extraReducers:(builder=>{
        builder.addCase(addBasketItemAsync.pending,(state,action)=>{
            console.log(action);
            state.status='pendingAddItem'+action.meta.arg.productId;
            
        });
       
              builder.addCase(removeBasketItemAsync.fulfilled,(state,action)=>{
                const {productId,quentity}=action.meta.arg;
                const itemIndex=state.basket?.items.findIndex(x=>x.productId===productId);
                if(itemIndex===-1 || itemIndex === undefined)return;

                state.basket!.items[itemIndex].quentity -=quentity;
                if(state.basket?.items[itemIndex].quentity === 0)
                    state.basket.items.splice(itemIndex,1);
                    state.status='idle';
                
                
            });
            builder.addCase(removeBasketItemAsync.pending,(state,action)=>{
                state.status='pendingRemoveItem'+action.meta.arg.productId+action.meta.arg.name;
            }) ;
            builder.addCase(removeBasketItemAsync.rejected,(state)=>{
                state.status='idle';
            }) 
            builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled,fetchBasketAsync.fulfilled),(state,action)=>{
                state.basket=action.payload
                state.status='idle'
            }) ;
                builder.addMatcher(isAnyOf(addBasketItemAsync.rejected,fetchBasketAsync.rejected),(state)=>{
                    state.status='idle'
                    
                });
        
        })})

export const {setbasket,clearBasket}=basketSlicer.actions;