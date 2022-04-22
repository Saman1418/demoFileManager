import React, { useState,createContext } from "react";
export const PlayerContext = createContext({
    play: (playerId) => true,
    pause: (playerId) => true,
    isPlaying: (playerId) => false,
  });
  
  function PlayerProvider({ children }) {
    // store the id of the current playing player
    const [playing, setPlaying] = useState('');
  
    // set playing to the given id
    const play = (playerId) => setPlaying(playerId);
  
    // unset the playing player
    const pause = () => setPlaying(false);
  
    // returns true if the given playerId is playing

    const isPlaying = (playerId) => playerId === playing



    console.log("playing",playing)
    // console.log("playerId",playerId)
  
    return (
      <PlayerContext.Provider value={{ play, pause, isPlaying }}>
        {children}
      </PlayerContext.Provider>
    )
  }
  
  export default PlayerProvider;