import { Button, ButtonGroup, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../App/store/configurestore";
import { decreament, increament } from "./CounterSlice";

export default function ContectPage(){
    const {data,title}=useAppSelector(state => state.counter);
    const dispatch=useAppDispatch();
    return (
        <>
        <Typography variant="h2">
        data is {data}
        <br/>
        <Typography variant="h3">
            title is {title}
        </Typography>

        </Typography>
        <ButtonGroup >
            <Button onClick={()=>dispatch(increament(1))} variant="contained" color="primary">Increment</Button>
            <Button onClick={()=>dispatch(decreament(1))} variant="contained" color="error">Decrement</Button>
            <Button onClick={()=>dispatch(increament(5))} variant="contained" color="error">Increment by 5</Button>
        </ButtonGroup>
        </>
    )
}