import Navbar from "../Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const [token, setToken] = useState(null)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        setToken(localStorage.getItem("token"))

        if (token) getProfile();
        
    }, [token])

    const getProfile = async () => {
        const res = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        const data = await res.json();

        if(data.error) 
            localStorage.removeItem("token");
        else
            setProfile(data);
    }

    const showProfile = () => {
        navigate("/profile",{
            state:{
                showStats: true
            }
        });
    }

    

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center items-center my-3">
                <span className="">Home</span>
                {profile &&
                    <span className="text-xl text">Welcome, {profile.display_name} 👋</span>
                }
                {!profile && <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={showProfile}>Profile</button>}
            </div>
        </>
    );
}

export default Home;