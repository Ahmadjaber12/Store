import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../App/Models/User";
import { FieldValues } from "react-hook-form";
import agent from "../../App/api/agent";
import { router } from "../../App/Router/router";
import { toast } from "react-toastify";
import { setbasket } from "../Basket/BasketSlicer";

interface AccountState{
    user:User | null
}
const initialState:AccountState={
    user:null
}
export const signInUser=createAsyncThunk<User,FieldValues>(

    'account/signInUser',
    async (data,thunkAPI)=>{
            try{
                    const userDto =await agent.Account.login(data)
                     const {basket,...user}=userDto;
                     if(basket) thunkAPI.dispatch(setbasket(basket));
                    localStorage.setItem("user",JSON.stringify(user))
                    return user
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }catch(error:any){
                return thunkAPI.rejectWithValue({error:error.data})
            }
    }
   
)
export const  fetchCurrentUser=createAsyncThunk<User>(
    'account/fetchCurrentUser',

    async (_,thunkAPI)=>{

        thunkAPI.dispatch(setuser(JSON.parse(localStorage.getItem('user')!)))
        
            try{
                    const userDto=await agent.Account.currentUser()
                    const {basket,...user}=userDto;
                     if(basket) thunkAPI.dispatch(setbasket(basket));
                    localStorage.setItem("user",JSON.stringify(user))
                    return user
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }catch(error:any){
                return thunkAPI.rejectWithValue({error:error.data})
            }
    }, {
        condition:()=>{
            if(!localStorage.getItem('user') ) return false;
        }
    }
)

export const AccountSlice=createSlice({
    name:"account",
    initialState,
    reducers:{
        signOut:(state)=>{
            state.user=null
            localStorage.removeItem('user')
            router.navigate('/')
        },
        setuser:(state,action)=>{
            state.user=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCurrentUser.rejected,(state)=>{
            state.user=null;
            localStorage.removeItem('user');
            toast.error('Session Expired - please login again')
            router.navigate('/')
        });
            builder.addMatcher(isAnyOf(signInUser.fulfilled,fetchCurrentUser.fulfilled),(state,action)=>{
                state.user=action.payload;
                
            });
            builder.addMatcher(isAnyOf(signInUser.rejected),(_state,action)=>{
                console.log(action.payload);
                
    })
},
})

export const {signOut,setuser}=AccountSlice.actions