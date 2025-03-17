/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, selectUserLoggedIn } from './main.tsx';
import LoginForm from './components/user-components/LoginForm.tsx';
import Home from './components/home';
import Logout from './components/logout';
import NavBar from './components/navigation/NavBar';
import CreateLeagueForm from './components/LeagueComponents/CreateLeagueForm.tsx';
//import io from 'socket.io-client';
import IdleTimer from './components/IdleTimer';
import ChatRoomList from './ChatComponents/ChatRoomList';
import Dashboard from "./components/DashboardComponents/Dashboard";
import "./App.css";
// import RegistrationPageUpdated from './components/user-components/RegistrationPageUpdated.tsx';
import EmailVerifyPage from "./components/EmailVerifyPage.js";
import LeaguesPage from "./components/LeagueComponents/LeaguePage.tsx";
//import { useJsApiLoader } from '@react-google-maps/api';
// import Map from "./components/Map.jsx";
// import { APIProvider } from '@vis.gl/react-google-maps';
//import libraries from "../src/components/Library.ts";
import ErrorPage from './components/ErrorComponents/PageDoesNotExist.tsx';
import { LoadingProvider } from '../src/LoadingContext/LoadingContext.tsx';
import { ConnectionManager } from './components/SocketManagers/ConnectionManager';
import { GoogleOAuthProvider } from '@react-oauth/google';
// Import the Theme Provider
import { ThemeProvider } from '../src/theme/ThemeProviderShad.tsx';
import AdminDashboard from './components/AdminComponents/AdminDashboard.tsx';
//import SocketTest from './SocketTest.jsx';

const App = () => {

    //const googleMapsApiKey: string = process.env.REACT_APP_GOOGLE_MAPS_API!;

    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: googleMapsApiKey, // Replace with your actual API key
    //     libraries
    // });

    const isLoggedIn = useSelector(selectUserLoggedIn);

    const dispatch = useDispatch();

    // get user city from either db or redux state
    const [city, setCity] = useState<any>('austin');
    // const [citySearch, setCitySearch] = useState<any>('');

    // const [coordinates, setCoordinates] = useState<any>(null);
      
    // const [markers, setMarkers] = useState<any>([]);

    // const getCityCoordinates = async (city: string) => {
    //     const geocoder = new window.google.maps.Geocoder();

    //     return new Promise((resolve, reject) => {

    //         geocoder.geocode({ address: city }, (results: any, status: string) => {
    //             if (status === 'OK' && results[0]) {
    //               resolve({
    //                   lat: results[0].geometry.location.lat(),
    //                   lng: results[0].geometry.location.lng(),
    //               });
    //             } else {
    //               reject('City not found');
    //             }
    //         });
    //     });
    // };

    const handleSubmit = (e:any) => {
      e.preventDefault();
      //setCitySearch(city)
    };

    // working fine just commneted out so i dont use the api every app load
    // eventually move to "add your home court"
    
  // useEffect(() => {
  //   if (!isLoaded || !window.google) return;

    
  //   const fetchCoordinates = async () => {
  //       try {
  //         const coordinates = await getCityCoordinates(city);
  //         console.log('Coordinates:', coordinates);
  //         setCoordinates(coordinates);
  //         // You can use coordinates here, for example, setting map center
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  
  //     fetchCoordinates();

  //   const service = new window.google.maps.places.PlacesService(new window.google.maps.Map(document.createElement("div")));
  //   service.textSearch(
  //     {
  //       query: `public tennis or pickleball courts in ${city}`,
  //     },
  //     (results, status) => {
  //       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
  //         console.log("marker results from search: ", results)
  //         setMarkers(results);
  //       }
  //     }
  //   );

  // }, [city, isLoaded]);
    
    useEffect(()=>{

        const persistedUser:any = localStorage.getItem('userData');

        // const isValidated = checkTokenExpiration();
        
        // if there is a persisted user data
        if (persistedUser) {
          dispatch(loginSuccess(JSON.parse(persistedUser)));
        }
        // }
        // else{
        //     //<Navigate to="/post-login" />
        //     dispatch(logout())
        // }

    },[dispatch]);

    const checkSessionData = async () => {

      let response = await fetch("/session-data", {
        method: "GET"
      });

      response = await response.json();

      console.log("sessionData: ", response)
      return response;

    }

    return (
      <ThemeProvider defaultTheme="system" storageKey="app-theme">
        <GoogleOAuthProvider clientId={process.env.VITE_GOOGLE_OAUTH_FIREBASE_CLIENT!}>
          <Router>
            <LoadingProvider>
              <NavBar/>

              {/* <SocketTest/> */}
              
              <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
                  <Route path="/leagues" element={isLoggedIn ? <LeaguesPage /> : <Navigate to="/login" />} />
                  <Route path="/create-league" element={<CreateLeagueForm />} />
                  <Route path="/login" element={<LoginForm />}/>
                  <Route path="/logout" element={<Logout />}/>
                  {/* <Route path="/registration" element={<RegistrationPageUpdated />}/> */}
                  <Route path="/verify/:token" element={<EmailVerifyPage />}/>
                  <Route path="/admin" element={<AdminDashboard />}/>
                  <Route path="*" element={<ErrorPage />}/>
              </Routes>
              {/* 
                -- used to test socket connection --
                <ConnectionState isConnected={ isConnected } />
                <Events events={ fooEvents } />
                <ConnectionManager /> 
              */}
              {isLoggedIn ? <ChatRoomList/> : null}
              {isLoggedIn ? <IdleTimer/> : null}

              <ConnectionManager/>

              <form onSubmit={handleSubmit}>
                <label>
                  City:
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </label>
                <button type="submit">Search</button>
              </form>

              <button onClick={checkSessionData}>check session data</button>
              {/* <APIProvider 
                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API} 
                onLoad={() => {
                        console.log('Maps API has loaded.');
                    }
                }
                >
                    {coordinates !== null ? 
                        <Map center={coordinates} markers={markers}/>
                        : null
                    }
                    
                </APIProvider> */}
          </LoadingProvider>
          </Router>
        </GoogleOAuthProvider>
      </ThemeProvider>
    );
};

export default App;