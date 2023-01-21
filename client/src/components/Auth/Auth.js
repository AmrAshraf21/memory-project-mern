import React, { useState,useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import {gapi} from 'gapi-script';
import {useDispatch} from 'react-redux';
import {signin , signup} from '../../actions/auth';
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Paper,
  Button,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import Input from "./Input";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";

const initialState= {firstName:"" , lastName:"",email:"",password:"",confirmPassword:""}
export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData , setFormData] = useState(initialState);


  const dispatch = useDispatch();
  
  const history = useHistory();

  const [isSignUp, setIsSignUp] = useState(false);
  
  const classes = useStyles();
  
  const handleSubmit = (e) => {
    e.preventDefault();
   if(isSignUp){
    dispatch(signup(formData,history));
}else{
       dispatch(signin(formData,history));

   } 
   
  };
  
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})

  };
  
  const handleShowPassword = () => setShowPassword((prevState) => !prevState);
  
  const switchMood = () => {
    setIsSignUp((prevState) => !prevState);
    setShowPassword(false);
  };
  
  
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "81869382604-0ec72k9ck323pla3bitqnuhvnk4989uo.apps.googleusercontent.com",
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);


  const googleSuccess =async (res) => {
   const result = res?.profileObj;
   const token = res?.tokenId;
   try{
        dispatch({type:"AUTH",data:{result ,token}})
        history.push('/');
   }catch(error){
    console.log(error);
   }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessfully");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign IN"}
          </Button>
          <GoogleLogin
            clientId="81869382604-0ec72k9ck323pla3bitqnuhvnk4989uo.apps.googleusercontent.com"
            scope="email"
            
          
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMood}>
                {isSignUp
                  ? "Already Have An Account? Sing In"
                  : "Don't Have an Account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
