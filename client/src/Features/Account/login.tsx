import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Avatar, Container, Grid, Paper } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../App/store/configurestore';
import { signInUser } from './accountSlice';



export default function Login() {
 const Navigate=useNavigate();
 const location = useLocation();
 const dispatch=useAppDispatch();
 const {register,handleSubmit,formState:{isSubmitting,errors,isValid}}=useForm({mode:"onTouched"})
  
async function Submitform(data:FieldValues) {
    try{
    await dispatch(signInUser(data))
    Navigate(location.state.from || "/catalog")}catch(err){
      console.log(err);
      
    }
}

  return (
        <Container component={Paper} maxWidth="sm" sx={{display:"flex", flexDirection:"column",alignItems:"center",p:4}}>
            <Avatar sx={{m:1,bgcolor:"secondary.main"}}>
                <LockOutlined/>
            </Avatar>
          <Typography
            component="h1"
            variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(Submitform)}
            sx={{
             mt:1
            }}
          >
              <TextField
                margin='normal' 
                label="Username"
                {...register('username',{required:"username is required"}) }
                error={!!errors.username}  
                helperText={errors?.username?.message as string}   
                required 
                autoFocus
                fullWidth         
              />
              <TextField
                margin='normal' 
                type="Password"
                label="Password"
                autoComplete="password"
                {...register('password',{required:"password is required"})} 
                error={!!errors.password} 
                helperText={errors?.password?.message as string}           
                required
                fullWidth 
                               
              /> 
            <LoadingButton disabled={!isValid} type='submit' loading={isSubmitting}
             fullWidth variant='contained' sx={{mt:3,mb:2}} >
                Sign in
                </LoadingButton>           
                <Grid container>
                    
                    <Grid item >
                        <Link to="/register">
{                        "Don't have an account? Sign Up"
}                        </Link>
                    </Grid>
                </Grid>
                </Box>
                </Container>
  )
}


