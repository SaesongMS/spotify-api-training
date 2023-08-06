import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { redirectToAuthCodeFlow, getAccessToken } from "../Helpers/AuthPKCE";
import { useNavigate } from "react-router-dom";

function Profile() {

    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const REDIRECT_URI = "http://localhost:3000/profile"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPES = ["user-read-private", "user-read-email"]

    const loginURL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join("%20")}`

    const [token, setToken] = useState("")
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

        if(token) getProfile();

    }, [token])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
        setProfile(null)
    }

    const getProfile = async () => {
        const res = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {

                Authorization: 'Bearer ' + token
            }
        });
        const data = await res.json();
        setProfile(data);
    }


    return (
    <div>
        <Navbar />
        <h1>Profile</h1>
        {!token ?
            <a href={loginURL} onClick={console.log(loginURL)}>Login
                to Spotify</a>
            : <button onClick={logout}>Logout</button>}
        {profile && <h2>{JSON.stringify(profile)}</h2>}


    </div>
    );
}

export default Profile;