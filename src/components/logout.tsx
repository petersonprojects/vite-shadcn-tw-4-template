import React, { useEffect } from 'react';

import { useDispatch} from "react-redux";
import { logout, setClearNotifications, setClearChatList } from '../main';
import {Link} from "react-router-dom";
// import { checkTokenExpiration, refreshAccessToken } from '../Functions/JWTFunctions';
// import { selectUserId } from '../main';
// import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import TextField from '@mui/material/TextField';

const Logout = () => {

    const dispatch = useDispatch();
    // const userId = useSelector(selectUserId);
    // const navigate = useNavigate();

    useEffect(()=>{

        const logoutFunc = async () => {

            fetch("/api/logout", {
                method: "POST"
            })
            .then(resp => {
                return resp.json()
            })
            .then(data=> {
                console.log(data)
            })

              
            localStorage.clear();
            dispatch(logout());
            dispatch(setClearNotifications());
            dispatch(setClearChatList());

        };

        logoutFunc();


        //localStorage.removeItem('userData');

    }, []);

    return (<>
        {"logged out "}
        <br/>
        <Link to="/login">Login</Link>
        </>
    );
};
    

export default Logout;
