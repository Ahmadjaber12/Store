import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";
interface Props{
    items:string[];
    checked?:string[];
    onChange:(items:string[])=> void;

}
export default function CheckButtons({items,checked,onChange}:Props){
    
    const [checkedItems,setCheckedItems]=useState(checked || [])
    function handleChecked(value:string){

        const currentIndex=checkedItems.findIndex(item=>item==value);

        let newChecked:string []=[];

        if  (currentIndex === -1)
            newChecked=[...checkedItems,value]
        
        else newChecked=checkedItems.filter(item=> item!=value)
        setCheckedItems(newChecked);
        onChange(newChecked);
    }
    return( 
     <FormGroup >
    {items.map(value=>(
   
   <FormControlLabel control={<Checkbox checked={checkedItems.indexOf(value)!=-1} onClick={()=>handleChecked(value)}/>} label={value} key={value} />
    )
    )}
  </FormGroup>
  )
}