// import React, { useEffect, useState, useRef } from 'react';
// import { TextField, Button, Grid } from '@mui/material';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import { useNavigate } from 'react-router-dom';
// import { useForm, SubmitHandler, Controller } from 'react-hook-form';

// // import {
// //   APIProvider,
// //   useMapsLibrary
// // } from '@vis.gl/react-google-maps';


// // Type definition for form inputs for useForm
// type Inputs = {
//   firstName: string;
//   lastName: string;
//   username: string;
//   email: string;
//   emailConfirm: string;
//   password: string;
//   passwordConfirm: string;
//   city: string;
//   state: string;
// };

// // Interface for PlaceAutocomplete component props
// export interface PlaceAutocompleteProps {
//   onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
//   error: boolean;
//   helperText: string | undefined;
//   setSelectedPlace: React.Dispatch<React.SetStateAction<google.maps.places.PlaceResult | null>>;
// }
// // PlaceAutocomplete component for handling city input with Google Places Autocomplete
// export const PlaceAutocomplete = React.forwardRef(({
//   onPlaceSelect,
//   error,
//   helperText,
//   setSelectedPlace,
// }: PlaceAutocompleteProps, ref) => {
//   const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Load the Google Maps Places library
//   //const places = useMapsLibrary('places');

//   useEffect(() => {
//     if (!places || !inputRef.current) return;

//     const options: google.maps.places.AutocompleteOptions = {
//       types: ['(cities)'], // Restrict to city types
//       fields: ['address_components'] // Fields to retrieve
//     };

//     setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
//   }, [places]);

//   useEffect(() => {
//     // Add listener for place selection
//     if (!placeAutocomplete) return;
//     const listener = placeAutocomplete.addListener('place_changed', () => {
//       const place = placeAutocomplete.getPlace();
//       console.log('Selected place data:', place);
//       onPlaceSelect(place); // Callback with the selected place
//       setSelectedPlace(place);
//     });
//     return () => {
//       google.maps.event.removeListener(listener); // Clean up listener
//     };
//   }, [onPlaceSelect, placeAutocomplete]);

//   return (
//     <TextField
//       fullWidth
//       label="City"
//       variant="outlined"
//       inputRef={inputRef}
//       name="city"
//       error={error}
//       helperText={helperText}
//     />
//   );
// });

// // Google Maps API key from environment variables
// const API_KEY: string = process.env.VITE_GOOGLE_MAPS_API!;

// // RegistrationForm component for handling user registration
// const RegistrationForm = () => {
//   const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<Inputs>({
//     mode: "onChange",
//     defaultValues: {
//       state: "" // Set default value for 'state'
//     }
//   }); // Form handling hooks

//   // List of state options for selection
//   const stateOptions = [
//     'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
//     'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
//     'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
//     'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
//     'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
//   ];

//   const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null); // State for storing selected place

//   const navigate = useNavigate();

//   const getReactHookFormValidation = (field: string) => {
//     switch (field) {
//       case 'firstName':
//         return {
//           required: "This field is required.",
//           minLength: { value: 2, message: "Must be at least 2 characters." },
//           maxLength: { value: 24, message: "Must be 24 characters or less." },
//           pattern: { value: /^[a-zA-Z-]+$/, message: "Contains invalid characters." }
//         };
//       case 'lastName':
//         return {
//           required: "This field is required.",
//           minLength: { value: 2, message: "Must be at least 2 characters." },
//           maxLength: { value: 24, message: "Must be 24 characters or less." },
//           pattern: { value: /^[a-zA-Z-]+$/, message: "Contains invalid characters." }
//         };
//       case 'username':
//         return {
//           required: "This field is required.",
//           minLength: { value: 3, message: "Must be at least 3 characters." },
//           maxLength: { value: 24, message: "Must be 24 characters or less." },
//           pattern: { value: /^[a-zA-Z0-9-_]+$/, message: "Contains invalid characters." }
//         };
//       case 'email':
//         return {
//           required: "This field is required.",
//           pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format." }
//         };
//       case 'emailConfirm':
//         return {
//           required: "This field is required.",
//           pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format." }
//         };
//       case 'password':
//         return {
//           required: "This field is required.",
//           minLength: { value: 8, message: "Must be at least 8 characters." },
//           maxLength: { value: 128, message: "Must be 128 characters or less." },
//           pattern: {
//             value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?!.* )(?=.*?[#?!@$%^&*-]).{8,}$/,
//             message: "Must contain 8+ characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
//           }
//         };
//       case 'passwordConfirm':
//         return {
//           required: "This field is required.",
//           minLength: { value: 8, message: "Must be at least 8 characters." },
//           maxLength: { value: 128, message: "Must be 128 characters or less." },
//           pattern: {
//             value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?!.* )(?=.*?[#?!@$%^&*-]).{8,}$/,
//             message: "Must contain 8+ characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
//           }
//         };
//       case 'city':
//         return {
//           required: "This field is required.",
//           validate: (value: string) => (!!selectedPlace && value === selectedPlace.address_components?.find(c => c.types.includes('locality'))?.long_name) || "Please select a city from the autocomplete suggestions"
//         };
//       case 'state':
//         return {
//           required: "This field is required.",
//           validate: (value: string) => stateOptions.includes(value) || "Invalid state code"
//         };
//       default:
//         return {};
//     }
//   };

//   // Handler for when a place is selected
//   const handlePlaceSelect = (place: google.maps.places.PlaceResult | null) => {
//     if (place && place.address_components) {
//       const cityComponent = place.address_components.find(
//         component => component.types.includes('locality')
//       );
//       const stateComponent = place.address_components.find(
//         component => component.types.includes('administrative_area_level_1')
//       );

//       const cityName = cityComponent?.long_name || '';
//       const stateCode = stateComponent?.short_name || '';

//       setValue('city', cityName); // Set city value
//       setValue('state', stateCode); // Set state value
//     }
//   };

//   // Submit handler for the form
//   const onSubmit: SubmitHandler<Inputs> = (data) => {
//     console.log("onSubmit data: ", data);

//     fetch('/registration', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username: data.username,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         password: data.password,
//         email: data.email,
//         city: data.city,
//         state: data.state
//       }),
//     })
//       .then((response) => response.json())
//       .then((dater) => {
//         console.log(dater);
//         if (dater.success === true) {
//           console.log('User registered!');
//           navigate("/login");
//         } else {
//           console.log(dater.errors);

//           let errorString = dater.errors.map((err: any) => {
//             return err.message;
//           });

//           alert(errorString.join("\n"));
//         }
//       })
//       .catch((error) => {
//         console.error('Error registering user:', error);
//       });
//   };

//   useEffect(() => {
//     console.log("errors: ", errors);
//   }, [errors]);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <TextField
//             {...register("firstName", getReactHookFormValidation("firstName"))}
//             fullWidth
//             label="First Name"
//             name="firstName"
//             id="firstName"
//             error={!!errors.firstName?.message}
//             helperText={errors.firstName?.message}
//             inputProps={{ "data-testid": "first-name-field" }}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             {...register("lastName", getReactHookFormValidation("lastName"))}
//             fullWidth
//             label="Last Name"
//             name="lastName"
//             id="lastName"
//             error={!!errors.lastName?.message}
//             helperText={errors.lastName?.message}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             {...register("username", getReactHookFormValidation("username"))}
//             fullWidth
//             label="Username"
//             error={!!errors.username?.message}
//             helperText={errors.username?.message}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             {...register("email", getReactHookFormValidation("email"))}
//             fullWidth
//             label="Email"
//             error={!!errors.email?.message}
//             helperText={errors.email?.message}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             {...register("emailConfirm", getReactHookFormValidation("emailConfirm"))}
//             fullWidth
//             label="Confirm Email"
//             error={!!errors.emailConfirm?.message}
//             helperText={errors.emailConfirm?.message}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             {...register("password", getReactHookFormValidation("password"))}
//             fullWidth
//             label="Password"
//             type="password"
//             error={!!errors.password?.message}
//             helperText={errors.password?.message}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             {...register("passwordConfirm", getReactHookFormValidation("passwordConfirm"))}
//             fullWidth
//             label="Confirm Password"
//             type="password"
//             error={!!errors.passwordConfirm?.message}
//             helperText={errors.passwordConfirm?.message}
//           />
//         </Grid>

//         <APIProvider apiKey={API_KEY}>
//           <Grid item xs={12} md={6}>
//             <div className="autocomplete-control">
//               <PlaceAutocomplete
//                 {...register("city", getReactHookFormValidation("city"))}
//                 onPlaceSelect={handlePlaceSelect}
//                 error={!!errors.city?.message}
//                 helperText={errors.city?.message}
//                 setSelectedPlace={setSelectedPlace}
//               />
//             </div>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormControl sx={{ width: "100px" }}>
//               <InputLabel id="simple-state-selector-label">State</InputLabel>
//               <Controller
//                 name="state"
//                 control={control}
//                 rules={getReactHookFormValidation("state")}
//                 render={({ field }) => (
//                   <Select
//                     {...field}
//                     labelId="simple-state-selector-label"
//                     label="State"
//                     error={!!errors.state?.message}
//                   >
//                     {stateOptions.map((state) => (
//                       <MenuItem key={state} value={state}>
//                         {state}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 )}
//               />
//             </FormControl>
//           </Grid>
//         </APIProvider>

//         <Grid item xs={12}>
//           <Button variant="contained" color="primary" type="submit">
//             Register
//           </Button>
//         </Grid>
//       </Grid>
//     </form>
//   );
// };

// export default RegistrationForm;