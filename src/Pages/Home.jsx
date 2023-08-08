import Navbar from "../Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoCard from "../Components/Cards/InfoCard";

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

    const toProfile = () => {
        if(!profile)
            showProfile();
        else
            navigate("/profile");
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
            <div className="flex flex-col justify-center items-center my-3 max-w-4xl mx-auto">
                {profile &&
                    <span className="text-xl font-bold mb-0  divide-y divide-gray-400">Welcome, {profile.display_name} 👋</span>
                }
                <div className="flex flex-row justify-center items-center my-3">
                    <InfoCard name="User Stats" text="See your top tracks and artists" url="userstats.JPG" onClick={toProfile}/>
                    <InfoCard name="Artist Tracks" text="See artist's top tracks, stats and similar performers" url="artiststats.JPG" onClick={() => navigate("/artist")}/>

                </div>
            </div>
        </>
    );
}

export default Home;