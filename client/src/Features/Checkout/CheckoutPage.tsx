import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import {  FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./checkoutValidators";
import agent from "../../App/api/agent";
import { useDispatch } from "react-redux";
import { clearBasket } from "../Basket/BasketSlicer";
import { LoadingButton } from "@mui/lab";
import { StripeElementType } from "@stripe/stripe-js";
import { useAppSelector } from "../../App/store/configurestore";
import { CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";


const steps = ['Shipping address', 'Review your order', 'Payment details'];

export default function CheckoutPage() {
    
    const [activeStep, setActiveStep] = useState(0);
    const [orderNumber,setOrderNumber]=useState(0);
    const [loading,setloading]=useState(false);
    const dispatch=useDispatch();
    const [PaymentSucceded,setPaymentSucceded]=useState(false);
    const {basket}=useAppSelector(state=>state.basket);
    const stripe=useStripe();
    const elements=useElements();
    const [PaymentMessage,setPaymentMessage]=useState('');
    const [cardState,setcardState]=useState<{elementError:{[key in StripeElementType]?:string}}>({elementError:{}})
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [cardComplete,setcardComplete]=useState<any>({cardNumber:false,cardExpiry:false,cardCvc:false});
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onCardInputChange(event:any){
    setcardState({
      ...cardState,
      elementError:{
        ...cardState.elementError,  
        [event.elementType]:event.error?.message
      }
    })
    setcardComplete({...cardComplete,[event.elementType]:event.complete});
  }  
    
    const currentValidationSchema=validationSchema[activeStep];
    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <AddressForm/>;
            case 1:
                return <Review/>;
            case 2:
                return <PaymentForm cardState={cardState} onCardInputChange={onCardInputChange}/>;
            default:
                throw new Error('Unknown step');
        }
    }
    const methods=useForm({
        mode:'all',
        resolver:yupResolver(currentValidationSchema)
    });
    useEffect(()=>{
        agent.orders.fetchAddress()
        .then(response=>  {
            if(response){
                methods.reset({...methods.getValues(),...response,saveAddress:false})
            }
        })
    },[methods])

    
   async function submitOrder(data:FieldValues){
        setloading(true);
        const {nameOnCard,saveAddress,...shipping}=data;
        if(!stripe || !elements) return;
        try{
            const cardElement=elements.getElement(CardNumberElement);
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            const paymentResult=await stripe.confirmCardPayment(basket?.clientSecret!,{
                payment_method:{
                    card:cardElement!,
                    billing_details:{
                        name:nameOnCard
                    }
                }
            });
            console.log(paymentResult);
            if(paymentResult.paymentIntent?.status==='succeeded'){
                const orderNumber = await agent.orders.create({
                    saveAddress,
                    shipping,
                  });
                
                setOrderNumber(orderNumber);
                setPaymentSucceded(true);
                setPaymentMessage('Thank you-we have recieved your payment');
                setActiveStep(activeStep + 1);
                dispatch(clearBasket());
                setloading(false);
            }else{
                setPaymentMessage(paymentResult.error?.message!);
                setPaymentSucceded(false);
                setloading(false);
                setActiveStep(activeStep +1);
            }
        }catch(error){
            console.log(error);
            setloading(false)
            
        }
    }

    const handleNext = async (data: FieldValues) => {     
      
      if (activeStep === steps.length - 1) {
        await submitOrder(data)
      } else {
        setActiveStep(activeStep + 1);
      }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    }
    function submitDisabled():boolean {
        if(activeStep === steps.length -1){
            return !cardComplete.cardCvc
            || !cardComplete.cardExpiry
            || !cardComplete.cardNumber
            || !methods.formState.isValid
        }
        else{
            return !methods.formState.isValid
        }
    }
        
    
    return (
        <FormProvider  {...methods}>
        <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
            <Typography component="h1" variant="h4" align="center">
                Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <>
                {activeStep === steps.length ? (
                    <>
                        <Typography variant="h5" gutterBottom>
                            {PaymentMessage}
                        </Typography>
                        {PaymentSucceded ? (
                            <Typography variant="subtitle1">
                            Your order number is #{orderNumber}. We have emailed your order
                            confirmation, and will send you an update when your order has
                            shipped.
                        </Typography>
                        ): (
                            <Button variant="contained" onClick={handleBack}>
                                    Go Back and try again
                            </Button>
                        )}
                        
                    </>
                ) : (
                    <form onSubmit={methods.handleSubmit(handleNext)}>
                        {getStepContent(activeStep)}
                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                    Back
                                </Button>
                            )}
                            <LoadingButton 
                            loading={loading} 
                            disabled={submitDisabled()}
                                variant="contained"
                                type="submit"
                                sx={{mt: 3, ml: 1}}>
                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </LoadingButton>
                        </Box>
                    </form>
                )}
            </>
        </Paper>
        </FormProvider>
    );
}
