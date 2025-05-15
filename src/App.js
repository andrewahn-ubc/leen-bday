// App.jsx or App.tsx
import React, { useEffect, useState } from "react";
import Card from "./Card";
import events from './assets/events.json'
import "./App.css"

function App() {
  const footerMessage = "made with <3"
  const spotifyPlaylist = "https://open.spotify.com/playlist/6cSzgIJJczZ3rrrzYEfEVp?trackId=3JGtEMktx8XnEVjVUYgU0M"

  return (
    <>
      <div className="header">
        <div className="subheader">
          <h1>Leen's bday playlist</h1>
          <img className="snoopy" src="images/snoopy.png" alt="snoopy"/>
        </div>
        <a className="open-spotify-button" href={spotifyPlaylist} target="_blank" rel="noopener noreferrer">Open in Spotify</a>
      </div>

      <div className="cards-container">
        {Object.entries(events).map(([emoji_name, event]) => (
          <Card spotify_id={event["song id"]}
                emoji={event["emoji path"]}
                date={event["date"]}
                desc={event["event description"]}
                note={event["note"]}
          />
        ))}
      </div>

      <div className="footer-message">
        {footerMessage}
      </div>
    </>
  );
}

export default App;
