import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material"
import agent from "../../App/api/agent"
import { useState } from "react"

export default function AboutPage(){
    const [ValidationErrors,setValidationErrors]=useState<string[]>([]);
    
    function getValidationError(){
        agent.Errors.getValidationError().then(()=> console.log("should not see this"))
        .catch(error=> setValidationErrors(error));
        
    }
    return (
        <Container>

        <Typography gutterBottom variant="h2">Errors for testing purposes</Typography>
        <ButtonGroup fullWidth>
        <Button variant="contained" onClick={()=> agent.Errors.get400Error().catch(error=> console.log(error))}>Test 400 Error</Button>
        <Button variant="contained" onClick={()=> agent.Errors.get401Error().catch(error=> console.log(error))}>Test 401 Error</Button>
        <Button variant="contained" onClick={()=> agent.Errors.get404Error().catch(error=> console.log(error))}>Test 404 Error</Button>
        <Button variant="contained" onClick={()=> agent.Errors.get500Error().catch(error=> console.log(error))}>Test 500 Error</Button>
        <Button variant="contained" onClick={getValidationError}>Test Validation Error</Button>

        </ButtonGroup>
        {ValidationErrors.length >0 && 
            <Alert severity="error">
                <AlertTitle>
                    Validation Errors
                </AlertTitle>
                <List>
                    {ValidationErrors.map(err=>(
                        <ListItem key={err}>
                            <ListItemText>{err}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Alert>
        }
        </Container>
        
    )
}