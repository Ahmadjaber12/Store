import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../Layout/App";
import HomePage from "../../Features/Home/HomePage";
import Catalog from "../../Features/Catalog/Catalog";
import ProductPage from "../../Features/Catalog/ProductDetails";
import AboutPage from "../../Features/About/AboutPage";
import ContectPage from "../../Features/Content/ContentPage";
import ServerError from "../Errors/Server-error";
import NotFound from "../Errors/NotFound";
import Basketpage from "../../Features/Basket/BasketPage";
import CheckoutPage from "../../Features/Checkout/CheckoutPage";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'',element:<HomePage/>
            },
            {
                path:'catalog',element:<Catalog/>
            },
            {
                path:'catalog/:id',element:<ProductPage/>
            },
            {
                path:'About',element:<AboutPage/>
            },
            {
                path:'contact',element:<ContectPage/>
            },
            {
                path:'Server-Error',element:<ServerError/>
            },
           
            {
                    path:"basket",element:<Basketpage/>
            },
            {
                path:"checkout",element:<CheckoutPage/>
        
            },
            {
                path:'Not-Found',element:<NotFound/>
            },
            {
                path:'*',element:<Navigate replace to="/not-found"/>
            }
        ]

    }
])