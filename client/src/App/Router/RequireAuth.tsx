import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configurestore";

export default function RequireAUTH(){
    const {user}= useAppSelector(state=>state.account);
    const location=useLocation();

    if(!user){
        return <Navigate to='/login' state={{from:location}}/>

    }
    return <Outlet />
}