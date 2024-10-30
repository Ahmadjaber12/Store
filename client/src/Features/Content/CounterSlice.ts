import { createSlice } from "@reduxjs/toolkit"

export interface CounterState{
    data:number,
    title:string
}

 const initialState:CounterState={
        data:42,
        title:"Ahmad Zalat"
}

export const counterslice= createSlice({
    name:"counter",
    initialState,
    reducers:{
        increament:(state,action)=>{
            state.data += action.payload
        },
        decreament:(state,action)=>{
            state.data -= action.payload
        }
    }
})
export const {increament,decreament} = counterslice.actions