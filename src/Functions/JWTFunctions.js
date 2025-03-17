import {jwtDecode} from "jwt-decode";
const fetchToken = async (userId) => {

    // pass USER ID!

    console.log("userId in fetch token: ", userId)

    if(!userId){
        console.log("no user id passed to fetch token")
        return;
    }
        
    // api call to get refresh token - pass it userId

    const accessToken = localStorage.getItem("accessToken");

    console.log("access token directly before if statement fethcToken: ", accessToken);

    if(accessToken !== "null" || accessToken !== null)
    {

        const response = await fetch('/api/get-refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });

            console.log("response in fetchToken from getrefresh: ", response)
        
            if (response.ok) {
                const data = await response.json();
                console.log("data right before the return: ", data);

                return data.accessToken;
            } else {

                throw new Error('Error refreshing token');

            }

    }


};

export const refreshAccessToken = async (userId) => {
    const newAccessToken = await fetchToken(userId); // Retrieve from DB

    console.log("access token from db: ", newAccessToken);

    localStorage.setItem("accessToken", newAccessToken);

    return newAccessToken;

};

export const checkTokenExpiration = (token) => {
  
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Get current time in seconds
  
      if (decoded?.exp && decoded.exp < currentTime) {
        // Token is expired
        console.log("token is expired..")
        return false;
      } else {
        // Token is valid, load the page normally
        console.log("token is still valid..")
        return true;
      }
    }
    else{
        console.log("token malformity..")
        return false;
    }
}