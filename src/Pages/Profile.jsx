import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { redirectToAuthCodeFlow, getAccessToken } from "../Helpers/AuthPKCE";

function Profile() {

    const spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const [pkce_code, setPkceCode] = useState(undefined);

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        try {
            setPkceCode(params.get('code'));
        } catch (error) {
            console.log(error);
        }
        if(pkce_code === undefined){
            redirectToAuthCodeFlow(spotify_client_id);
        } else {
            getProfile();
        }
    }, [spotify_client_id])

    const getProfile = async () => {
        const spotify_access_token = await getAccessToken(pkce_code);
        const res = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + spotify_access_token
            }
        });
        const data = await res.json();
        setProfile(data);
    }


    return (
    <div>
        <Navbar />
        <h1>Profile</h1>
        {profile && <h2>{profile.display_name}</h2>}

    </div>
    );
}

export default Profile;