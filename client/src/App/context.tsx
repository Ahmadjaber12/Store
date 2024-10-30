import {  createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "./Models/Basket";

interface StoreContextValue   {

basket: Basket | null;
setBasket:(basket :Basket)=>void;
removeItem: (productId:number,quentity:number)=>void;

}   

export const StoreContext= createContext<StoreContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useStoreContext(){
    const context=useContext(StoreContext);

    if(context===undefined){

        throw new Error("Oops - we do not seem to be inside the provider")
        
    }
    return context;
}
export function StoreProvider({children}:PropsWithChildren<unknown>){

    const [basket,setBasket]=useState <Basket |null>(null);

    function removeItem(productId:number,quentity:number){

        if(!basket) return;
        const items=[...basket.items];  
        const basketItem=items.findIndex(i=> i.productId===productId);
        if(basketItem >= 0) 

            items[basketItem].quentity -= quentity
        if(items[basketItem].quentity==0)

                        items.splice(basketItem,1);
        setBasket(prevState=>{
            return {...prevState!,items}
        })
    }


    return (
        <StoreContext.Provider value={{basket,setBasket,removeItem}}>
            {children}
        </StoreContext.Provider >
    );

}
