/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserId } from "../main";
import CarouselGallery from "../components/CarouselGallery";
// import {jwtDecode} from "jwt-decode";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// import MyComponent from "../test-components/MyComponent";

//import { WalkThroughTooltipComponent } from '../components/TestComponents/WalkThroughTooltipComponent';

import { refreshAccessToken, checkTokenExpiration } from '../Functions/JWTFunctions';

const Home = () => {

    const userId = useSelector(selectUserId);
    const [imagesUrls, setImageUrls] = useState<any>([]);

    const navigate = useNavigate();

    useEffect(() => {
        //console.log(imagesUrls);
    }, [imagesUrls]);

    useEffect(()=>{

        // const imageUrls = require('../carousel-images', false, /\.(png|jpg|jpeg|gif|svg)$/);
        // const filteredImageUrls = imageUrls.keys().map(url => url.replace(/^.*?\/\//, '/'));
        // setImageUrls(filteredImageUrls);
        
    }, []);

    const testProtectedApi = async () => {

        let accessToken: string | null = localStorage.getItem("accessToken");

        // change this later. local stage is saving null as a string
        // convert string value null to true null
        if(accessToken === "null"){
            accessToken = null;
            navigate('/login'); // Redirect to login route
            return;
        }

        console.log("accessToken: ", accessToken);

        // access token of null indicates that they may be logged in but their refresh token is expired
        // so they must login again to generate new on

        if(accessToken !== null){

            checkTokenExpiration(accessToken);

            // Check if access token is expired
            try {

                if (!checkTokenExpiration(accessToken)) {

                    console.log("token is expired.. attempting refresh");
                    // Token expired, refresh it
                    const token = await refreshAccessToken(userId);

                    if(token === "null" || token === null){
                        navigate("/login");
                        return;
                    }

                    accessToken = token;

                }

                console.log("accesstoken right before protected call: ", accessToken);


                fetch('/api/protected-resource', {
                    method: 'POST',
                    headers: {
                    'Authorization': `Bearer ${accessToken}`, // Replace with actual token
                    },
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    alert(data.message)
                })
                .catch(error => console.error(error));



            } catch (error) {
                // Token is invalid or cannot be decoded
                console.error("Error decoding access token:", error);
                // Handle error (e.g., redirect to login)
                navigate('/login')
            }

        }
        else{

            // the refresh token is expired
            // redirect login or re-authenticate
            navigate('/login'); // Redirect to login route
        }

    }

    return (<>

        {
            imagesUrls.length > 0 ? 

                <CarouselGallery 
                style={{height: "350px"}}
                images={imagesUrls}
                /> 
            
            : ""
        }
{/* 
        { userId ?
            // <>{`Welcome ${JSON.parse(localStorage.getItem("userData") as any).username}`}</>
            <>{`Welcome user`}</>
            : <>not logged in home</>
        }
        <br/>
        <button style={{color:"inherit"}} onClick={testProtectedApi}>Test API</button>

        { imagesUrls.length > 0 ? <CarouselGallery images={imagesUrls}/> : ""}


        <button onClick={testProtectedApi}>Test API</button> */}
        </>
    );
};
    

export default Home;
