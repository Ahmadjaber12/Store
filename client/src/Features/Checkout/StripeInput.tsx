import { InputBaseComponentProps } from "@mui/material";
import {  forwardRef, Ref, useImperativeHandle, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends InputBaseComponentProps {}

export const StripeInput=forwardRef(function StripeInput({component:Component,...props}:Props,ref:Ref<unknown>){
       
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ElementRef=useRef<any>();

    useImperativeHandle(ref,()=>({
        focus:()=>ElementRef.current.focus
    }))
    return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Component onReady={(element:any)=>ElementRef.current=element}
            {...props}
        />
    )

}) 