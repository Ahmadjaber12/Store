import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import CheckoutPage from "./CheckoutPage";
import { useAppDispatch } from "../../App/store/configurestore";
import { useEffect, useState } from "react";
import agent from "../../App/api/agent";
import { setbasket } from "../Basket/BasketSlicer";
import LoadingComponent from "../../App/Layout/loadingComponent";

const stripePromise=loadStripe('pk_test_51QIdINL4hH4yom1UsywbjTCWzSF44DNukIowBdJSNasgXxkoxg9W3eNE6i3dQ2olmHQaDPNvA4T1jaMrL5dXiJLb00qfrse7qd');

export default function CheckoutWrapper(){
    const dispatch=useAppDispatch();
    const [loading,setloading]=useState(true);

    useEffect( ()=>{
        agent.payments.createPaymentIntent().
        then((Basket)=>dispatch(setbasket(Basket)))
        .catch((err)=>console.log(err)).
        finally(()=>setloading(false));
        
    },[dispatch]);
    if(loading)return <LoadingComponent message="loading Basket..."/>
    return (
        <Elements stripe={stripePromise}>
                <CheckoutPage />
        </Elements>
    )
}


