// App.jsx or App.tsx
import React, { useEffect, useState } from "react";
import Card from "./Card";
import events from './assets/events.json'
import "./App.css"

function App() {
  const footerMessage = "made with <3"
  const spotifyPlaylist = "https://open.spotify.com/playlist/6cSzgIJJczZ3rrrzYEfEVp?trackId=3JGtEMktx8XnEVjVUYgU0M"

  const [tracksData, setTracksData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const trackIds = Object.values(events).map(event => event["song id"])

  // Process in batches of 4
  const batchSize = 4;
  const batches = [];
  
  // Create batches of track IDs
  for (let i = 0; i < trackIds.length; i += batchSize) {
    batches.push(trackIds.slice(i, i + batchSize));
  }
  
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setIsLoading(true);
        const tokenRes = await fetch("/api/spotify-token");
        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        const trackIds = Object.values(events).map(event => event["song id"]);
        
        const batchSize = 4;
        const batches = [];
        
        for (let i = 0; i < trackIds.length; i += batchSize) {
          batches.push(trackIds.slice(i, i + batchSize));
        }
        
        const allTracksData = {};
        
        for (let i = 0; i < batches.length; i++) {
          const batch = batches[i];
          const batchIds = batch.join(',');
          
          const response = await fetch(`https://api.spotify.com/v1/tracks?ids=${batchIds}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          
          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${await response.text()}`);
          }
          
          const data = await response.json();
          
          data.tracks.forEach(track => {
            if (track) {
              allTracksData[track.id] = track;
            }
          });
        }
        
        setTracksData(allTracksData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setIsLoading(false);
      }
    };
    
    fetchTracks();
  }, []);

  return (
    <>
      <div className="app-container">
        <div className="header">
          <img className="title" src="images/title.png" alt="leen's bday playlist"/>
          <a className="open-spotify-button" href={spotifyPlaylist} target="_blank" rel="noopener noreferrer">Open in Spotify</a>
        </div>

        <div className="cards-container">
        {Object.entries(events).map(([emoji_name, event]) => (
            <Card 
              key={emoji_name}
              spotify_id={event["song id"]}
              emoji={event["emoji path"]}
              date={event["date"]}
              desc={event["event description"]}
              note={event["note"]}
              trackData={tracksData[event["song id"]]}
              isLoading={isLoading}
            />
          ))}
        </div>

        <div className="footer-message">
          <p>{footerMessage}</p>
          <img className="snoopy" src="images/snoopy.png" alt="snoopy"/>
        </div>
      </div>
    </>
  );
}

export default App;
