import { createBrowserRouter } from "react-router-dom";
import App from "../Layout/App";
import HomePage from "../../Features/Home/HomePage";
import Catalog from "../../Features/Catalog/Catalog";
import ProductPage from "../../Features/Catalog/ProductDetails";
import AboutPage from "../../Features/About/AboutPage";
import ContectPage from "../../Features/Content/ContentPage";

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
            }
        ]

    }
])