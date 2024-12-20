import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound(){
    return (
        <Container component={Paper} sx={{height:400}}>
            <Typography variant="h3" gutterBottom >
            Oops - We couldn't find what you are looking for
            </Typography>
            <Divider/>
            <Button component={Link} to="/catalog">Go back to shop</Button>
        </Container>
    )
}