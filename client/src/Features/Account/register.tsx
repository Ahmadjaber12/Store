import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Alert, AlertTitle, Avatar, Container, Grid, List, ListItem, ListItemText, Paper } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import {  useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../App/api/agent';
import { useState } from 'react';
import { toast } from 'react-toastify';



export default function Register() {
const navigate=useNavigate();
 const {register,handleSubmit,setError,formState:{isSubmitting,errors,isValid}}=useForm({mode:"all"})
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const [validationErrors,setvalidationErrors]=useState([]);

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 function handleErrors(errors:any){
    if(errors){
        errors.forEach((err:string) => {
                if(err.includes('Password'))
                    setError('password',{message:err})
                else if(err.includes('Email'))
                    setError('email',{message:err})
                else if(err.includes('Username'))
                    setError('username',{message:err})

        });
    }
 }


  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((data) =>
          agent.Account.register(data).then(()=>{
            toast.success('Registration Successful - you can Now login!')
            navigate('/login');
          }).catch((err) => handleErrors(err))
        )}
        sx={{
          mt: 1,
        }}
      >
        <TextField
          margin="normal"
          label="Username"
          {...register("username", { required: "username is required" })}
          error={!!errors.username}
          helperText={errors?.username?.message as string}
          required
          autoFocus
          fullWidth
        />
        <TextField
          margin="normal"
          label="Email"
          {...register("email", { required: "Email is required" 
            ,pattern:{
                // eslint-disable-next-line no-useless-escape
                value: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                message:"Not a valid email"
            }
          })}
          error={!!errors.email}
          helperText={errors?.email?.message as string}
          required
          fullWidth
        />
        <TextField
          margin="normal"
          type="Password"
          label="Password"
          autoComplete="Password"
          {...register("password", { required: "Password is required" 
            ,pattern:{
                value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                message:"Password doesn't meet the Requirments",
          }})}
          error={!!errors.password}
          helperText={errors?.password?.message as string}
          required
          fullWidth
        />
        {validationErrors.length > 0 && (
          <Alert severity="error">
            <AlertTitle>Validation Errors</AlertTitle>
            <List>
              {validationErrors.map((err) => (
                <ListItem key={err}>
                  <ListItemText>{err}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Alert>
        )}
        <LoadingButton
          disabled={!isValid}
          type="submit"
          loading={isSubmitting}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/login">{"Already have an account? Sign in"} </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}


