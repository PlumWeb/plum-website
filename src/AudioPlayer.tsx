import { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Player.css';
import music from './assets/music/music.mp3';

const Player = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className={`player-widget ${isMinimized ? 'minimized' : ''}`}>

      {/* Windows 7 Title Bar */}
      <div className="player-title-bar">
        <div className="player-title-bar-left">
          <span className="player-icon"></span>
          <span className="player-title-text">Windows Media Player</span>
        </div>
        <div className="player-title-bar-controls">
          <button
            className="player-control-btn"
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            {isMinimized ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {/* Audio Player */}
      {!isMinimized && (
        <div className="player-body">
          <AudioPlayer
            src={music}
            onPlay={() => console.log("Playing")}
            onError={(e) => console.log("Error:", e)}
            showSkipControls={false}
            showJumpControls={true}
            layout="horizontal"
          />
        </div>
      )}

    </div>
  );
};

export default Player;