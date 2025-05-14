// App.jsx or App.tsx
import React, { useEffect, useState } from "react";
import Card from "./Card";
import events from './assets/events.json'

function App() {
  const footerMessage = "made with <3"
  return (
    <>
      <div>
        <h1>Leen's bday playlist :) </h1>
      </div>

      <div>
        {Object.entries(events).map(([emoji_name, event]) => (
          <Card spotify_id={event["song id"]}
                emoji={event["emoji path"]}
                date={event["date"]}
                desc={event["event description"]}
                note={event["note"]}
          />
        ))}
      </div>

      <div>
        {footerMessage}
      </div>
    </>
  );
}

export default App;
