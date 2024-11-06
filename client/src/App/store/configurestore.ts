import { configureStore } from "@reduxjs/toolkit";
import { counterslice } from "../../Features/Content/CounterSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSlicer } from "../../Features/Basket/BasketSlicer";
import { catalogSlice } from "../../Features/Catalog/catalogSlicer";
import { AccountSlice } from "../../Features/Account/accountSlice";

// export function configureStore(){
//     return createStore(CounterReducer);
// }

export const store=configureStore({
    reducer:{
        counter:counterslice.reducer,
        basket: basketSlicer.reducer,
        catalog:catalogSlice.reducer,
        account:AccountSlice.reducer
    }
})

export type RootState=ReturnType<typeof store.getState>;

export type AppDispatch= typeof store.dispatch;

export const useAppDispatch= () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

