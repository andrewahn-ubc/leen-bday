// App.jsx or App.tsx
import React, { useEffect, useState } from "react";
import "./Card.css"

function Card(props) {
  return (
    <>
      <div className="card-container">
        <div className="card-title">
          <img className="emoji" src={props.emoji} alt="cute emoji"/>
          <h1 className="description">{props.desc}</h1>
        </div>

        <div className="card-info">
          <div className="event-container">
            <h1 className="date">{props.date}</h1>
            <p className="note">{props.note}</p>
          </div>

          {!props.isLoading ? 
            <div className="song-container">
              <a className="song-link" href={props.trackData.external_urls["spotify"]} target="_blank" rel="noopener noreferrer">
                  <img className="album-cover" src={props.trackData.album.images[1].url} alt="cute album cover" />
                  <p className="song-name">{props.trackData.name}</p>
                  <p className="artist-name">{props.trackData.artists[0].name}</p>
              </a>
            </div>
            :
            <p>loading song...</p>
          }
        </div>
      </div>
    </>
  );
}

export default Card;
