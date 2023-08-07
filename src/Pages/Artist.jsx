import Navbar from "../Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import DeafultCard from "../Components/Cards/DefaultCard";
import ArtistCard from "../Components/Cards/ArtistCard";
import ArtistsList from "../Components/Cards/ArtistList";
import TrackList from "../Components/Cards/TracksList";

function Artist() {
    const spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    const [spotify_access_token, setSpotifyAccessToken] = useState("");

    const [query, setQuery] = useState("");
    const [artists, setArtists] = useState(null);
    const [artistInfo, setArtistInfo] = useState(null);
    const [similarArtists, setSimilarArtists] = useState(null);
    const [artistTopTracks, setArtistTopTracks] = useState(null);

    useEffect(() => {
        async function getAccessToken() {
            var authParams = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'grant_type=client_credentials&client_id=' + spotify_client_id + '&client_secret=' + spotify_client_secret
            }
            const res = await fetch('https://accounts.spotify.com/api/token', authParams)
            const data = await res.json();
            setSpotifyAccessToken(data.access_token);
        }
        getAccessToken();
    }, [spotify_client_id, spotify_client_secret])

    async function getArtists() {
        if(query==="") return;
        const res = await fetch('https://api.spotify.com/v1/search?q=' + query + '&type=artist&limit=6', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + spotify_access_token
            }
        });
        const data = await res.json();
        setArtists(data.artists.items);
        setArtistInfo(null);
        setSimilarArtists(null);
        setArtistTopTracks(null);
    }

    async function getInfo(id){
        const artist = await fetch('https://api.spotify.com/v1/artists/' + id, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + spotify_access_token
            }
        });
        const artistData = await artist.json();
        setArtistInfo(artistData);
        
        const similarArtists = await fetch('https://api.spotify.com/v1/artists/' + id + '/related-artists', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + spotify_access_token
            }
        });
        const similarArtistsData = await similarArtists.json();
        similarArtistsData.artists = similarArtistsData.artists.slice(0,6);
        setSimilarArtists(similarArtistsData.artists);

        const artistTopTracks = await fetch('https://api.spotify.com/v1/artists/' + id + '/top-tracks?market=US', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + spotify_access_token
            }
        });
        const artistTopTracksData = await artistTopTracks.json();
        artistTopTracksData.tracks = artistTopTracksData.tracks.slice(0,6);
        setArtistTopTracks(artistTopTracksData.tracks);

        setArtists(null);
    }


    return (
        <>
    <Navbar />
    <div className="flex flex-col bg-indigo-50 justify-center max-w-4xl mx-auto">
        <div className="flex flex-row mb-4 justify-center my-5 p-2">
            <input
                placeholder="Search for an artist"
                className="border border-gray-300 rounded-md p-2"
                onChange={(e) => setQuery(e.target.value)}
            ></input>
            <button
                className="border border-gray-300 rounded-md p-2"
                onClick={getArtists}
            >Search</button>
        </div>
        <div className="flex flex-wrap justify-center -mb-4 -mx-2">
            {artists && artists.map(artist => {
                var subject = {
                    id: artist.id ? artist.id : "",
                    name: artist.name ? artist.name : "",
                    url: artist.images.length!==0 ? artist.images[0].url : "https://i.imgur.com/hepj9ZS.png",
                    genres: artist.genres ? artist.genres : []
                }
                return( 
                    <div className="w-full sm:w-1/2 md:w-1/3 mb-4 px-2" key={subject.id}>
                        <DeafultCard title={subject.name} url={subject.url} type="artist" genres={subject.genres} getInfo={getInfo} id={subject.id}/>  
                    </div>
                )
            })}
        </div>
        <div className="flex flex-row mb-4 justify-center items-start my-5 p-2">
            {artistInfo && 
            <div className="flex flex-col justify-center items-center mx-5">
                <ArtistCard title={artistInfo.name} url={artistInfo.images.length!==0 ? artistInfo.images[0].url : "https://i.imgur.com/hepj9ZS.png"} genres={artistInfo.genres} followers={artistInfo.followers.total} popularity={artistInfo.popularity}/>
            </div>}
            {similarArtists &&
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 bg-white rounded-lg shadow p-2 mx-5">
                <p className="text-lg font-medium text-gray-900 text-center mb-2">Similar Artists</p>
                {similarArtists.map(artist => {
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
            {artistTopTracks &&
            <ul className="max-w-sm divide-y divide-gray-200 dark:divide-gray-700 bg-white rounded-lg shadow p-2 mx-5">
                <p className="text-lg font-medium text-gray-900 text-center mb-2">Top Tracks</p>
                {artistTopTracks.map(track => {
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
        </div>       
    </div>
    </>
    );
}

export default Artist;