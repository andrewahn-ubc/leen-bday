// App.jsx or App.tsx
import React, { useEffect, useState } from "react";
import "./Card.css"

function Card(props) {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        // Call your Vercel serverless function to get the access token
        const tokenRes = await fetch("/api/spotify-token");
        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;
  
        // Spotify track ID (e.g., Eminem - Lose Yourself)
        const trackId = props.spotify_id;
  
        // Fetch track data from Spotify API
        const trackRes = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const trackData = await trackRes.json();
        setTrack(trackData);
      } catch (error) {
        console.error("Error fetching track:", error);
      }
    };
  
    fetchTrack();
  }, []);

  return (
    <>
      <div className="card-container">
        <div className="event-container">
          <div>
            <img className="emoji" src={props.emoji} alt="cute emoji"/>
            <h1 className="description">{props.desc}</h1>
          </div>
          <h1 className="date">{props.date}</h1>
          <p className="note">{props.note}</p>
        </div>

        {track ? 
          <div className="song-container">
            <img className="album-cover" src={track.album.images[1].url} alt="cute album cover" />
            <p className="song-name">{track.name}</p>
            <p className="artist-name">{track.artists[0].name}</p>
          </div> :
          <p>loading song...</p>
        }
      </div>
    </>
  );
}

export default Card;
