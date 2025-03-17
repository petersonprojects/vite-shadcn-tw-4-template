/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import useFormValidation from './useFormValidation';


const RegistrationPage = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [currentFocus, setCurrentFocus] = useState<string>('');
  const [isAllValid, setIsAllValid] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [errors, setErrors] = useState(
    {
      username: {
        hasBeenTouched: false,
        hasError: true,
        errorMessage: ""
      },
      firstName: {
        hasBeenTouched: false,
        hasError: true,
        errorMessage: ""
      },
      lastName: {
        hasBeenTouched: false,
        hasError: true,
        errorMessage: ""
      },
      password: {
        hasBeenTouched: false,
        hasError: true,
        errorMessage: ""
      },
      passwordConfirm: {
        hasBeenTouched: false,
        hasError: true,
        errorMessage: ""
      },
      // email has not been configured with regex and constraints yet
      email: {
        hasBeenTouched: false,
        hasError: false,
        errorMessage: ""
      },
      emailConfirm: {
        hasBeenTouched: false,
        hasError: true,
        errorMessage: ""
      },
    }
  );

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  useEffect(()=> {
    const validateUsername = () => {

      // alphanumeric with hyphens and spaces
      const regex = new RegExp(/^[a-zA-Z0-9-_]+$/);

      console.log("reg test: ",  regex.test(username))

      if(username.length < 3 && username.length !== 0){

        setErrors(prevErrors => ({
          ...prevErrors,
          username: {
            ...prevErrors.username,
            errorMessage: "Must be 3 or more characters",
            hasError: true
          }
        }));
      }
      else if(username.length > 24){

        setErrors(prevErrors => ({
          ...prevErrors,
          username: {
            ...prevErrors.username,
            errorMessage: "Username must be 24 characters or less",
            hasError: true
          }
        }));
      }
      else if(username.length <= 24 && username.length >= 3){

        setErrors(prevErrors => ({
          ...prevErrors,
          username: {
            ...prevErrors.username,
            errorMessage: "",
            hasError: false
          }
        }));
      }

            
      if(regex.test(username) === false && username.length >= 1) {
        setErrors(prevErrors => ({
          ...prevErrors,
          username: {
            ...prevErrors.username,
            errorMessage: "Contains invalid characters",
            hasError: true
          }
        }));
      }

    };
  
    validateUsername();

  }, [username]);

  useEffect(()=> {
    const validateName = () => {
      // alphanumeric with hyphens and spaces
      const regex = new RegExp(/^[a-zA-Z-]+$/);

      console.log("reg test name: ",  regex.test(firstName))

      if(firstName.length < 2  && firstName.length !== 0){
        setErrors(prevErrors => ({
          ...prevErrors,
          firstName: {
            ...prevErrors.firstName,
            errorMessage: "Must be 2 or more letters",
            hasError: true
          }
        }));

      }
      else if(firstName.length > 24){

        setErrors(prevErrors => ({
          ...prevErrors,
          firstName: {
            ...prevErrors.firstName,
            errorMessage: "Must be 24 letters or less",
            hasError: true
          }
        }));
      }
      else if(firstName.length <= 24 && firstName.length >= 2){

        setErrors(prevErrors => ({
          ...prevErrors,
          firstName: {
            ...prevErrors.firstName,
            errorMessage: "",
            hasError: false
          }
        }));
      }

      if(regex.test(firstName) === false && firstName.length >= 1) {
      
        setErrors(prevErrors => ({
          ...prevErrors,
          firstName: {
            ...prevErrors.firstName,
            errorMessage: "Contains invalid characters",
            hasError: true
          }
        }));
      }

    };
  
    validateName();

  }, [firstName]);

  useEffect(()=> {
    const validateLastName = () => {
      // alphanumeric with hyphens and spaces
      const regex = new RegExp(/^[a-zA-Z-]+$/);

      console.log("reg test lastName: ",  regex.test(lastName))

      if(lastName.length < 2  && lastName.length !== 0){
        setErrors(prevErrors => ({
          ...prevErrors,
          lastName: {
            ...prevErrors.lastName,
            errorMessage: "Must be 2 or more letters",
            hasError: true
          }
        }));

      }
      else if(lastName.length > 24){

        setErrors(prevErrors => ({
          ...prevErrors,
          lastName: {
            ...prevErrors.lastName,
            errorMessage: "Must be 24 letters or less",
            hasError: true
          }
        }));
      }
      else if(lastName.length <= 24 && lastName.length >= 2){

        setErrors(prevErrors => ({
          ...prevErrors,
          lastName: {
            ...prevErrors.lastName,
            errorMessage: "",
            hasError: false
          }
        }));
      }

      if(regex.test(lastName) === false && lastName.length >= 1) {
      
        setErrors(prevErrors => ({
          ...prevErrors,
          lastName: {
            ...prevErrors.lastName,
            errorMessage: "Contains invalid characters",
            hasError: true
          }
        }));
      }

    };
  
    validateLastName();

  }, [lastName]);

  useEffect(()=> {
    const validatePassword = () => {

      // alphanumeric with hyphens and spaces
      const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?!.* )(?=.*?[#?!@$%^&*-]).{4,}$");

      console.log("reg test pass: ",  regex.test(password))
      
      if(password === passwordConfirm && password.length >= 8 && password.length <= 128){

        setErrors(prevErrors => ({
          ...prevErrors,
          password: {
            ...prevErrors.password,
            errorMessage: "",
            hasError: false
          }
        }));
      }
            
      if(regex.test(password) === false && password.length >= 1) {

        setErrors(prevErrors => ({
          ...prevErrors,
          password: {
            ...prevErrors.password,
            errorMessage: "8+ characters\n1 uppercase letter\n1 lowercase letter\n1 number\n1 special character\nLess than 128 characters\nNo spaces",
            hasError: true
          }
        }));
      }

      if(regex.test(password) === true && password.length >= 8 && password.length <= 128){

        setErrors(prevErrors => ({
          ...prevErrors,
          password: {
            ...prevErrors.password,
            errorMessage: "",
            hasError: false
          }
        }));
      }

    };
  
    validatePassword();

  }, [passwordConfirm, password]);

  useEffect(()=> {

    if(passwordConfirm.length > 0 && password !== passwordConfirm){

      setErrors(prevErrors => ({
        ...prevErrors,
        passwordConfirm: {
          ...prevErrors.passwordConfirm,
          errorMessage: "Passwords do not match",
          hasError: true
        }
      }));
    }
    else if(passwordConfirm.length > 0 && password === passwordConfirm){
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordConfirm: {
          ...prevErrors.passwordConfirm,
          errorMessage: "",
          hasError: false
        }
      }));
    }

  }, [passwordConfirm, password]);


  useEffect(()=> {

    if(email !== emailConfirm){
      setErrors(prevErrors => ({
        ...prevErrors,
        emailConfirm: {
          ...prevErrors.emailConfirm,
          errorMessage: "Emails do not match",
          hasError: true
        }
      }));
    }

    if(email === emailConfirm && emailConfirm.length > 1){
        setErrors(prevErrors => ({
          ...prevErrors,
          emailConfirm: {
            ...prevErrors.emailConfirm,
            errorMessage: "",
            hasError: false
          }
        }));
    }

  }, [email, emailConfirm]);

  // error log
  useEffect(()=> {
    console.log(errors);

    let errorCount: number = 0;

    for (const [key, value] of Object.entries(errors)) {

      if(value.hasError === true){

        errorCount += 1;
      }
 
    }

    console.log("err count: ", errorCount)

    // and all have been touched

    if(errorCount === 0){
      setIsAllValid(true);
    }
    else{
      setIsAllValid(false);
    }

  }, [errors]);

  useEffect(()=> {console.log("isAllValid: ", isAllValid)}, [isAllValid])

  const handleSubmit = (event: any) => {
    event.preventDefault();

    console.log("attrs: ", username, firstName, email);

    fetch('/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success === true){
          console.log('User registered!');

          // send user to email verification screen
          // user dashboard? which shows verify email if not there
          navigate("/login");
        } 
        else{
          console.log(data.errors)

          const errorString = data.errors.map((err:any) => {
            return err.message;
          });

          errorString.toString();

          alert(errorString)
        }
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  };

  const splitErrorMessages = () => {
    const split = errors.password.errorMessage.split("\n");

    console.log("split: ", split)
    
    if(password.length >= 8){
      const index = split.indexOf("8+ characters");
      split.splice(index, 1);
    }
    
    if(password.length <= 128){
      const index = split.indexOf("Less than 128 characters");
      split.splice(index, 1);
    }
    
    const regexLowLetter = new RegExp("(?=.*[a-z])");
    const regexCapLetter = new RegExp("(?=.*[A-Z])");
    const oneDigit = new RegExp("(?=.*[0-9])");
    const specialChar = new RegExp("(?=.*?[#?!@$%^&*-])");
    const noSpaces = new RegExp(/\s/);
    
    if(regexLowLetter.test(password)){
      const index = split.indexOf("1 lowercase letter");
      split.splice(index, 1);
    }
    if(regexCapLetter.test(password)){
      const index = split.indexOf("1 uppercase letter");
      split.splice(index, 1);
    }
    if(oneDigit.test(password)){
      const index = split.indexOf("1 number");
      split.splice(index, 1);
    }
    if(specialChar.test(password)){
      const index = split.indexOf("1 special character");
      split.splice(index, 1);
    }
    if(!noSpaces.test(password)){
      const index = split.indexOf("No spaces");
      split.splice(index, 1);
    }
    
    const result = split.map(errMessage => {
      return <li>{errMessage}</li>
    });
    
    return result;
  }

  return (
    <Grid 
      container 
      spacing={4}
      sx={{
        padding: "5%"
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h4">Create Account</Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="first-name-registration"
          label="First Name"
          variant="outlined"
          inputProps={{
            autoComplete: 'new-password',
          }}
          value={firstName}
          sx={{width: "300px"}}
          required
          onChange={(event) => setFirstName(event.target.value)}

          error={
            errors.firstName.errorMessage.length > 0 && errors.firstName.hasBeenTouched ? true
            : errors.firstName.hasError === false && currentFocus === 'name' ? false
            : false
          }
          helperText={
            (errors.firstName.hasError) && errors.firstName.hasBeenTouched ? errors.firstName.errorMessage 
            : ""
          }
          onFocus={(e) => {
            setCurrentFocus('firstName');

            setErrors(prevErrors => ({
              ...prevErrors,
              firstName: {
                ...prevErrors.firstName,
                hasBeenTouched: true
              }
            }));
          }}
          onBlur={(e)=> {
            setCurrentFocus('')
            if(errors.firstName.hasBeenTouched && firstName.length === 0){
              setErrors(prevErrors => ({
                ...prevErrors,
                firstName: {
                  ...prevErrors.firstName,
                  errorMessage: "",
                  hasError: false
                }
              }));
            }
          }}
          focused={currentFocus === 'firstName'}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="last-name-registration"
          label="Last Name"
          variant="outlined"
          inputProps={{
            autoComplete: 'new-password',
          }}
          value={lastName}
          sx={{width: "300px"}}
          required
          onChange={(event) => setLastName(event.target.value)}

          error={
            errors.lastName.errorMessage.length > 0 && errors.lastName.hasBeenTouched ? true
            : errors.lastName.hasError === false && currentFocus === 'lastName' ? false
            : false
          }
          helperText={
            (errors.lastName.hasError) && errors.lastName.hasBeenTouched ? errors.lastName.errorMessage 
            : ""
          }
          onFocus={(e) => {
            setCurrentFocus('lastName');

            setErrors(prevErrors => ({
              ...prevErrors,
              lastName: {
                ...prevErrors.lastName,
                hasBeenTouched: true
              }
            }));
          }}
          onBlur={(e)=> {
            setCurrentFocus('')
            if(errors.lastName.hasBeenTouched && lastName.length === 0){
             
              setErrors(prevErrors => ({
                ...prevErrors,
                lastName: {
                  ...prevErrors.lastName,
                  errorMessage: "",
                  hasError: false
                }
              }));
            }
          }}
          focused={currentFocus === 'lastName'}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="email-registration"
          label="Email"
          sx={{width: "300px"}}
          type="email"
          autoComplete='off'
          variant="outlined"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="email-registration-confirm"
          label="Confirm Email"
          sx={{width: "300px"}}
          type="email"
          autoComplete='off'
          variant="outlined"
          value={emailConfirm}
          required
          
          error={
            errors.emailConfirm.hasError 
            && errors.emailConfirm.errorMessage.length > 0
            && errors.emailConfirm.hasBeenTouched ? true
            : errors.emailConfirm.hasError === false && currentFocus === 'emailConfirm' ? false
            : false
          }
          helperText={
            (errors.emailConfirm.hasError) && errors.emailConfirm.hasBeenTouched ? errors.emailConfirm.errorMessage 
            : ""
          }
          onFocus={(e) => {
            setCurrentFocus('emailConfirm');

            setErrors(prevErrors => ({
              ...prevErrors,
              emailConfirm: {
                ...prevErrors.emailConfirm,
                hasBeenTouched: true
              }
            }));
          }}
          onBlur={(e)=> {
            setCurrentFocus('')
          }}
          focused={currentFocus === 'emailConfirm'}
          onChange={(event) => setEmailConfirm(event.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="username-registration"
          label="Username"
          type="username"
          variant="outlined"
          value={username}
          inputProps={{
            autoComplete: 'new-password',
            autoFocus: false
          }}
          sx={{
            width: "300px",
          }}
          required
          error={
            errors.username.errorMessage.length > 0 && errors.username.hasBeenTouched ? true
            : errors.username.hasError === false && currentFocus === 'username' ? false
            : false
          }
          helperText={
            errors.username.hasError && errors.username.hasBeenTouched ? errors.username.errorMessage 
            : ""
          }
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          onFocus={(e) => {
            setCurrentFocus('username');

            setErrors(prevErrors => ({
              ...prevErrors,
              username: {
                ...prevErrors.username,
                hasBeenTouched: true
              }
            }));
          }}
          onBlur={(e)=> {
            setCurrentFocus('')

            if(errors.username.hasBeenTouched && username.length === 0){

              setErrors(prevErrors => ({
                ...prevErrors,
                username: {
                  ...prevErrors.username,
                  errorMessage: "",
                  hasError: false
                }
              }));
            }
          }}
          focused={currentFocus === 'username'}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="password-registration"
          label="Password"
          variant="outlined"
          sx={{width: "300px"}}
          inputProps={{
            autoComplete: 'new-password',

          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={
            errors.password.hasError && errors.password.errorMessage.length > 0
          }
          helperText={
            errors.password.hasError && errors.password.hasBeenTouched 
            ? <>{splitErrorMessages()}</>
            : ""
          }
          onFocus={(e) => {
            setCurrentFocus('password');
            setErrors({...errors, password: {...errors.password, hasBeenTouched: true}})
          }}
          onBlur={(e)=> {
            setCurrentFocus('')
            if(errors.password.hasBeenTouched && password.length === 0){
              setErrors({...errors, password: {hasError: false, errorMessage: "", hasBeenTouched: false}})
            }
          }}
          focused={currentFocus === 'password'}
          required
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Grid>

      
      <Grid item xs={12}>
        <TextField
          id="password-registration-confirm"
          label="Confirm Password"
          variant="outlined"
          sx={{width: "300px"}}
          inputProps={{
            autoComplete: 'new-password',
          }}
          error={ password !== passwordConfirm && errors.passwordConfirm.errorMessage.length > 0 && passwordConfirm.length > 0}
          required
          type={showPasswordConfirm ? "text":"password"}
          value={passwordConfirm}
          onChange={(event) => setPasswordConfirm(event.target.value)}
          onFocus={(e)=> {
            setCurrentFocus('passwordConfirm');
            setErrors({...errors, passwordConfirm: {...errors.passwordConfirm, hasBeenTouched: true}})
          }}
          helperText={
            errors.passwordConfirm.hasError ? errors.passwordConfirm.errorMessage : ""
          }
          onBlur={(e)=> {
            setCurrentFocus('');
            if(errors.passwordConfirm.hasBeenTouched && passwordConfirm.length === 0){
              setErrors({...errors, passwordConfirm: {hasError: false, errorMessage: "", hasBeenTouched: false}})
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password confirm visibility"
                  onClick={handleClickShowPasswordConfirm}
                  edge="end"
                >
                  {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          disabled={!isAllValid}
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default RegistrationPage;