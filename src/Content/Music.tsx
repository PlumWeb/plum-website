import React, { useEffect, useState } from 'react';
import './music.css';
import dancer from '../assets/sponge.gif';
import music from '../assets/disc.gif'

interface Track {
  name: string;
  artist: {
    '#text': string;
  };
  album?: {
    '#text': string;
  };
  image?: Array<{ '#text': string; size: string }>;
  url?: string;
  playcount?: string;
  '@attr'?: {
    nowplaying?: boolean;
  };
}

interface TopArtist {
  name: string;
  url: string;
  playcount: string;
}

const Music: React.FC = () => {
  const [nowPlaying, setNowPlaying] = useState<Track | null>(null);
  const [lastListened, setLastListened] = useState<Track | null>(null);
  const [last10, setLast10] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState({
    week: null as TopArtist | null,
    month: null as TopArtist | null,
    year: null as TopArtist | null,
  });
  const [listeningTime, setListeningTime] = useState<string>('Loading...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ FIXED: Correct environment variable names
  const username = import.meta.env.VITE_LASTFM_USERNAME;
  const apiKey = import.meta.env.VITE_LASTFM_API_KEY;

  // Helper function to fetch JSON
  const fetchJson = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`HTTP error! status: ${res.status}`);
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    } catch (err: any) {
      console.error('Fetch error:', err);
      throw err;
    }
  };

  // Format duration (hours and minutes)
  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  // Load all music data on component mount
  useEffect(() => {
    const loadMusicData = async () => {
      try {
        // Debug: Check if env variables are loaded
        console.log('Username:', username);
        console.log('API Key loaded:', !!apiKey);

        if (!username || !apiKey) {
          throw new Error('Missing Last.fm credentials in environment variables');
        }

        setLoading(true);
        setError(null);

        // Fetch recent tracks
        const recentUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=11`;
        console.log('Fetching from:', recentUrl);
        
        const recentData = await fetchJson(recentUrl);
        const tracks = Array.isArray(recentData.recenttracks.track)
          ? recentData.recenttracks.track
          : [recentData.recenttracks.track];

        if (tracks.length > 0) {
          // Now playing track
          const nowPlayingTrack = tracks.find((t: Track) => t['@attr']?.nowplaying);
          if (nowPlayingTrack) {
            setNowPlaying(nowPlayingTrack);
          }

          // Last listened
          const lastTrack = nowPlayingTrack ? tracks[1] : tracks[0];
          if (lastTrack) {
            setLastListened(lastTrack);
          }

          // Last 10 songs
          const last10Tracks = nowPlayingTrack ? tracks.slice(1, 11) : tracks.slice(0, 10);
          setLast10(last10Tracks);
        }

        // Fetch top artists
        const getTopArtist = async (period: string): Promise<TopArtist | null> => {
          const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${apiKey}&format=json&period=${period}&limit=1`;
          const data = await fetchJson(url);
          if (data.topartists?.artist?.length > 0) {
            return data.topartists.artist[0];
          }
          return null;
        };

        const [weekArtist, monthArtist, yearArtist] = await Promise.all([
          getTopArtist('7day'),
          getTopArtist('1month'),
          getTopArtist('12month'),
        ]);

        setTopArtists({
          week: weekArtist,
          month: monthArtist,
          year: yearArtist,
        });

        // Fetch total listening time
        const userUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${apiKey}&format=json`;
        const userData = await fetchJson(userUrl);
        const totalScrobbles = parseInt(userData.user.playcount);
        const averageTrackLengthSeconds = 180;
        const totalSeconds = totalScrobbles * averageTrackLengthSeconds;
        setListeningTime(
          `${formatDuration(totalSeconds)} (based on ${totalScrobbles} tracks, average ~3min)`
        );

        setLoading(false);
      } catch (err: any) {
        console.error('Error loading music data:', err);
        setError(err.message || 'Failed to load music data');
        setLoading(false);
      }
    };

    loadMusicData();
  }, [username, apiKey]);

  // Component to display a track card
  const TrackCard = ({ track }: { track: Track }) => {
    const image = track.image?.find(img => img.size === 'large')?.['#text'] || '';
    const artist = track.artist['#text'] || 'Unknown artist';
    const name = track.name || 'Unknown track';
    const album = track.album?.['#text'] || 'Unknown album';
    const url = track.url || '#';

    return (
      <div className="track-card">
        {image && (
          <img src={image} alt={name} className="track-image" />
        )}
        <div className="track-details">
          <a href={url} target="_blank" rel="noopener noreferrer" className="track-title">
            {name}
          </a>
          <div className="track-artist">{artist}</div>
          <div className="track-album">{album}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="music-content">
      {error && (
        <fieldset>
          <legend>Error Loading Music Data</legend>
          <p style={{ color: 'red' }}>
            ⚠️ {error}
            <br />
            <small>Check that VITE_LASTFM_USERNAME and VITE_LASTFM_API_KEY are set in .env.local</small>
          </p>
        </fieldset>
      )}

      <fieldset>
        <legend>Music!</legend>
        <p>This part basically just presents some music I listen to, using an API. :D</p>
        <img src={dancer} alt="Dancing" className="media-image" />
      </fieldset>

      <fieldset>
        <legend>🎧 Music</legend>

        {/* Now Playing */}
        <div className="music-section">
          <h3>Now Playing</h3>
          <div className="music-info-box">
            {loading ? (
              <p>Loading...</p>
            ) : nowPlaying ? (
              <TrackCard track={nowPlaying} />
            ) : (
              <p>Not playing anything now.</p>
            )}
          </div>
        </div>

        {/* Last Listened */}
        <div className="music-section">
          <h3>Last Listened</h3>
          <div className="music-info-box">
            {loading ? (
              <p>Loading...</p>
            ) : lastListened ? (
              <TrackCard track={lastListened} />
            ) : (
              <p>No last listened track.</p>
            )}
          </div>
        </div>

        {/* Last 10 Songs */}
        <div className="music-section">
          <h3>Last 10 Songs</h3>
          <div id="last-10-list" className="track-grid">
            {loading ? (
              <p>Loading...</p>
            ) : last10.length > 0 ? (
              last10.map((track, index) => (
                <div key={index} className="track-card-list">
                  <div className="track-number">{index + 1}</div>
                  <div className="track-card-info">
                    <a
                      href={track.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="track-title"
                    >
                      {track.name}
                    </a>
                    <div className="track-artist">{track.artist['#text']}</div>
                  </div>
                </div>
              ))
            ) : (
              <p>No tracks found</p>
            )}
          </div>
        </div>

        {/* Top Artists */}
        <div className="music-section">
          <h3>Top Artists</h3>
          <div className="music-info-box">
            <p>
              <strong>This Week:</strong>{' '}
              {loading ? (
                'Loading...'
              ) : topArtists.week ? (
                <>
                  <a href={topArtists.week.url} target="_blank" rel="noopener noreferrer">
                    {topArtists.week.name}
                  </a>
                  {' '}({topArtists.week.playcount} plays)
                </>
              ) : (
                'No data'
              )}
            </p>
            <p>
              <strong>This Month:</strong>{' '}
              {loading ? (
                'Loading...'
              ) : topArtists.month ? (
                <>
                  <a href={topArtists.month.url} target="_blank" rel="noopener noreferrer">
                    {topArtists.month.name}
                  </a>
                  {' '}({topArtists.month.playcount} plays)
                </>
              ) : (
                'No data'
              )}
            </p>
            <p>
              <strong>This Year:</strong>{' '}
              {loading ? (
                'Loading...'
              ) : topArtists.year ? (
                <>
                  <a href={topArtists.year.url} target="_blank" rel="noopener noreferrer">
                    {topArtists.year.name}
                  </a>
                  {' '}({topArtists.year.playcount} plays)
                </>
              ) : (
                'No data'
              )}
            </p>
          </div>
        </div>

        {/* Total Listening Time */}
        <div className="music-section">
          <h3>Total Listening Time</h3>
          <div className="music-info-box">
            <p>
              {loading ? 'Loading...' : `Estimated Total Listening Time: ${listeningTime}`}
            </p>
            <img src={music} alt="Music" className="media-image" />
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default Music;