import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import UserCard from "../Components/Cards/UserCard";
import TrackList from "../Components/Cards/TracksList";
import ArtistsList from "../Components/Cards/ArtistList";

function Profile() {

    const location = useLocation();

    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPES = ["user-read-private", "user-read-email", "user-top-read"]

    const loginURL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join("%20")}`

    const [token, setToken] = useState("")
    const [profile, setProfile] = useState(null)
    const [topTracks, setTopTracks] = useState(null)
    const [topArtists, setTopArtists] = useState(null)

    const [showStats, setShowStats] = useState(false)

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

    }, [token, showStats])

    useEffect(() => {
        if(location.state && location.state.showStats)
            setShowStats(true)

        if(showStats)
            document.getElementById("login-button").click()
    }, [location.state, showStats])


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
        if(!data.error){
            setProfile(data);
            getTopStats("tracks");
            getTopStats("artists");
        }
    }

    const getTopStats = async (type, time="long_term") => {
        const res = await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${time}&limit=5`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        const data = await res.json();
        if(data.error)
            logout();
        else{
            if(type==="tracks")
                setTopTracks(data.items);
            else
                setTopArtists(data.items);
        }
    }


    return (
    <div className="flex flex-col">
        <Navbar />
        <div className="flex flex-col my-3 max-w-6xl mx-auto">
        {!token ?
            <a href={loginURL} id="login-button" className="mx-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" >Login
                to Spotify</a>
            :
            <button className="ml-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
        }
        {profile && 
            <div className="flex flex-row mb-4 justify-center items-start my-5 p-2">
                <div className="mx-5">
                    <UserCard name={profile.display_name} url={profile.images[1].url} followers={profile.followers.total} />
                </div>
                {topTracks &&
                <ul className="divide-y divide-gray-200 dark:divide-gray-700 bg-white rounded-lg shadow p-2 mx-2">
                    <div className="flex flex-row justify-center items-center mb-2">
                        <p className="grow text-lg font-medium text-gray-900 text-left">Top Tracks</p>
                        <select className="flex-none text-right" onChange={(e)=>getTopStats("tracks", e.target.value)}>
                            <option value="long_term">All Time</option>
                            <option value="medium_term">Last 6 Months</option>
                            <option value="short_term">Last 4 Weeks</option>
                        </select>
                    </div>
                    {topTracks.map(track => {
                        var subject = {
                            id: track.id ? track.id : "",
                            name: track.name ? track.name : "",
                            image: track.album.images.length!==0 ? track.album.images[0].url : "https://i.imgur.com/hepj9ZS.png",
                            url: track.external_urls.spotify ? track.external_urls.spotify : "",
                            album: track.album.name ? track.album.name : "",
                            preview: track.preview_url ? track.preview_url : ""
                        }
                        return(
                            <TrackList key={subject.id} url={subject.url} name={subject.name} image={subject.image} album={subject.album} preview={subject.preview}/>
                        )
                    })}
                </ul>}
                {topArtists &&
                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 bg-white rounded-lg shadow p-2 mx-2">
                    <div className="flex flex-row justify-center items-center mb-2">
                        <p className="grow text-lg font-medium text-gray-900 text-left">Top Artists</p>
                        <select className="flex-none text-right" onChange={(e)=>getTopStats("artists", e.target.value)}>
                            <option value="long_term">All Time</option>
                            <option value="medium_term">Last 6 Months</option>
                            <option value="short_term">Last 4 Weeks</option>
                        </select>
                    </div>
                    {topArtists.map(artist => {
                        var subject = {
                            id: artist.id ? artist.id : "",
                            name: artist.name ? artist.name : "",
                            image: artist.images.length!==0 ? artist.images[0].url : "https://i.imgur.com/hepj9ZS.png",
                            genres: artist.genres ? artist.genres : [],
                            url: artist.external_urls.spotify ? artist.external_urls.spotify : ""
                        }
                        return(
                            <ArtistsList key={subject.id} type="Similar Artist" url={subject.url} name={subject.name} genres={subject.genres} image={subject.image}/>
                        )
                    })}
                </ul>}
            </div>
        }

        </div>
    </div>
    );
}

export default Profile;
