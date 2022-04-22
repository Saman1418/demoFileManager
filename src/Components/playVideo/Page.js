import PlayerProvider from './PlayerProvider';
import Player from './Player';

function Page() {
  return (
    <>
    <h1>sam</h1>
    <PlayerProvider>
      <Player video="https://btay-videos.s3.ap-southeast-1.amazonaws.com/Videos/Promo.mp4" id="player1" />
      <Player video="https://youtu.be/uH4c6slskMg" id="player2" />
      <Player video="https://btay-videos.s3.ap-southeast-1.amazonaws.com/Videos/Promo.mp4" id="player3" />
      {/* <Player video="/path/to/video2.mp4" id="player2" /> */}
      {/* <Player video="/path/to/video3.mp4" id="player3" /> */}
    </PlayerProvider>
    </>
  )
}
export default Page;