import { Checkbox, FormControlLabel } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps{
    label:string;
    disabled:boolean;
}
export default function AppCheckbox(props:Props){
const {field}=useController({...props,defaultValue:false})
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event.target.checked); // Update form state on change event only
};
return(
    <FormControlLabel
     control={
        <Checkbox
        {...field}
        onChange={handleChange}
        color="secondary"
        disabled={props.disabled}
         />}
    label={props.label}
    />

)
}