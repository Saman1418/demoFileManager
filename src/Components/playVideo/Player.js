import { useRef,useContext,useState } from "react";
import { PlayerContext } from './PlayerProvider';
import ReactPlayer from 'react-player'



function Player({ video, id }) {
  const videoRef = useRef();
  const [selectedVideoId,setSelectedVideoId] = useState("")
  const { isPlaying, play, pause } = useContext(PlayerContext);

  const updateVideoHandler = (id) => {
    setSelectedVideoId(id);
    if (!selectedVideoId) {
      videoRef?.current?.player?.player?.onPause();
    }
  };

  return(

  <ReactPlayer
    // onPlay={() => updateVideoHandler(id)}
    // ref={videoRef}
    playsinline={true}
    playing={isPlaying(id)}
    controls={true}
    url={video}
    width="20%"
    height="20%"
    // light="https://btay-videos.s3.ap-southeast-1.amazonaws.com/Videos/Promo.mp4"
    onPause={() => pause(id)}
    onEnded={() => pause(id)}
    // onClickPreview={() => play(id)}
    onPlay={() => play(id)}
    // onStart={() => play(id)}
    // playIcon={
    //   <div
    //     className="play-icon"
    //     role="button"
    //     tabIndex={0}
    //     style={{ outline: "none" }}
    //   >
    //     {" "}
    //     <img src="/images/play.png" alt="" />
    //   </div>
    // }
    // light={video?.pic}
    
  />
  )
}

export default Player;