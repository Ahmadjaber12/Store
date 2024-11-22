import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface Prop extends UseControllerProps{
    label:string
}

export default function AppTextInput(props:Prop){
    const {fieldState,field}=useController({...props,defaultValue:""})
return (
    <TextField
        {...props}
        {...field}
        fullWidth
        variant="outlined"
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
    />
)
}