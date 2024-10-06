import { Product } from "../../products"
import ProductList from "./ProductList";
import { useState, useEffect } from "react";



export default function Catalog(){
  const [products,SetProduct ] = useState<Product[]>([])

useEffect(()=>{
    fetch("http://localhost:5235/products").then(res=>res.json()).then(data=>SetProduct(data));
  }  ,[])

    return (
  <>
            <ProductList products={products} />
    </>
    )
}