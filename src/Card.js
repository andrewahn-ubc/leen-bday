// App.jsx or App.tsx
import React, { useEffect, useState } from "react";

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
        console.log(trackData)
      } catch (error) {
        console.error("Error fetching track:", error);
      }
    };
  
    fetchTrack();
  }, []);

  return (
    <div>
      <div>
        <div>
          <img src={props.emoji} alt="cute emoji"/>
          <h1>{props.date}</h1>
        </div>
        <h1>{props.desc}</h1>
      </div>

      {track ? (
        <div>
          <p>{track.name}</p>
          <p>{track.artists[0].name}</p>
          <img src={track.album.images[1].url} alt="cute album cover" />
        </div>
      ) : (
        <p>Loading track info...</p>
      )}

      <p>{props.note}</p>
    </div>
  );
}

export default Card;
