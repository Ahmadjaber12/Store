import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../Router/router";
import { PaginatResponse } from "../Models/Pagination";

axios.defaults.baseURL='http://localhost:5235';

axios.defaults.withCredentials=false

const sleep=()=> new Promise(resolve=>setTimeout(resolve,600));
const responseBody=(response:AxiosResponse)=> response.data;

axios.interceptors.response.use(async response =>{
    await sleep();
    const pagination=response.headers['pagination'];
    
    if(pagination)
{        
    response.data=new PaginatResponse(response.data,JSON.parse(pagination))
        
    return response;
}    
return response
},(error:AxiosError)=> {
    const {data,status}=error.response as AxiosResponse;
    switch(status){
        case 400:
            if(data.errors){
                const modelStateErrors : string[]=[];
                for (const key in data.errors)
                {
                    if(data.errors[key])
                        modelStateErrors.push(data.errors[key]);

                }
                throw modelStateErrors.flat();
            }
            
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 404:
            toast.error(data.title);
            break;
        case 500:
            router.navigate("/server-error",{state:{error:data}});
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})
const requests={

    get:(url:string,params?:URLSearchParams) =>axios.get(url,{withCredentials:true,params}).then(responseBody),
    post:(url:string,body:object) =>axios.post(url,body,{withCredentials:true}).then(responseBody),
    put:(url:string,body:object) =>axios.put(url,body,{withCredentials:true}).then(responseBody),
    delete:(url:string) =>axios.delete(url,{withCredentials:true}).then(responseBody),

}

const Errors={
    get400Error:()=>requests.get('/api/buggy/bad-request'),
    get401Error:()=>requests.get('/api/buggy/UnAuthorized'),
    get404Error:()=>requests.get('/api/buggy/NotFound'),
    get500Error:()=>requests.get('/api/buggy/Server-Error'),
    getValidationError:()=>requests.get('/api/buggy/Validation-Error')
}

const catalog={
    list:(params:URLSearchParams)=>requests.get('/products/filter',params),
    details:(id:number)=>requests.get(`/products/${id}`),
    filtersfetch:()=>requests.get("products/filters")
}
const Basket={
    get:()=>requests.get("/baskets"),
    addItem:(productId:number,quentity=1)=>requests.post(`/baskets?productId=${productId}&quentity=${quentity}`,{}),
    RemoveItem:(productId:number,quentity=1)=>requests.delete(`/baskets?productId=${productId}&quentity=${quentity}`),
}

const agent={
    catalog,
    Errors,
    Basket
}

export default agent;

