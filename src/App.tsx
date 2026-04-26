import React, { useState } from 'react';
import "7.css/dist/7.css";
import DesktopIcon from './DesktopIcon';
import WindowComponent from './WindowComponent';
import './App.css';
import Navbar from './Navbar';  
import Background from './background';  
import AudioPlayer from './AudioPlayer';
// For the Icons
import AboutMe from './assets/utilities/explorer.ico';
import Media from './assets/media/wmp1.ico';
import Music from './assets/media/spotify2.ico';
import Games from './assets/gaming/steam1.ico';
import Trash from './assets/utilities/trashbin1.ico';
import Guestbook from './assets/windows_vista/vista_book_3.ico';
import MessageMe from './assets/communication/discord1.ico';

// Content for the windows
import ContentAboutMe from './Content/About';
import ContentMusic from './Content/Music';
import ContentGames from './Content/Games';
import ContentMedia from './Content/Media';
import ContentGuestbook from './Content/Guestbook';
import ContentTrash from './Content/Trash';
import ContentMessage from './Content/Message'

interface WindowData {
  id: string;
  title: string;
  content: React.ReactNode;
}

function App() {
  const [windows, setWindows] = useState<WindowData[]>([]);

  const addWindow = (title: string, content: React.ReactNode) => {
    const id = Date.now().toString();
    const existingWindow = windows.find(w => w.title === title);
    if (existingWindow) return;
    
    setWindows([...windows, { id, title, content }]);
  };

  const removeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const isWindowOpen = (title: string) => {
    return windows.some(w => w.title === title);
  };

  return (
    <>
      <Background />
      
      <div className="desktop-container">
        <div className="desktop-icons">
          <DesktopIcon
            icon={<img src={AboutMe} style={{ width: '48px', height: '48px' }} />}
            label="About Me"
            onOpen={() => addWindow('About Me', <ContentAboutMe />)}
            isWindowOpen={isWindowOpen('About Me')}
          />
          
          <DesktopIcon
            icon={<img src={Media} style={{ width: '48px', height: '48px' }} />}
            label="Media"
            onOpen={() => addWindow('Media', (
               <ContentMedia />
            ))}
            isWindowOpen={isWindowOpen('Media')}
          />
          
          <DesktopIcon
            icon={<img src={Music} style={{ width: '48px', height: '48px' }} />}
            label="Music"
            onOpen={() => addWindow('Music', (
              <ContentMusic/>
            ))}
            isWindowOpen={isWindowOpen('Music')}
          />

          <DesktopIcon
            icon={<img src={Games} style={{ width: '48px', height: '48px' }} />}
            label="Games"
            onOpen={() => addWindow('Games', (
             <ContentGames />
            ))}
            isWindowOpen={isWindowOpen('Games')}
          />
          

          <DesktopIcon
            icon={<img src={Guestbook} style={{ width: '48px', height: '48px' }} />}
            label="Guestbook"
            onOpen={() => addWindow('Guestbook', (
              <ContentGuestbook />
            ))}
            isWindowOpen={isWindowOpen('Guestbook')}
          />

          <DesktopIcon
            icon={<img src={MessageMe} style={{ width: '48px', height: '48px' }} />}
            label="Message Me"
            onOpen={() => addWindow('Message Me <3', (
              <ContentMessage />
            ))}
            isWindowOpen={isWindowOpen('Message Me <3')}
          />

          <DesktopIcon
            icon={<img src={Trash} style={{ width: '48px', height: '48px' }} />}
            label="Trash"
            onOpen={() => addWindow('Trash', (
              <ContentTrash />
            ))}
            isWindowOpen={isWindowOpen('Trash')}
          />

        </div>

        {windows.map(win => (
          <WindowComponent
            key={win.id}
            title={win.title}
            onClose={() => removeWindow(win.id)}
          >
            {win.content}
          </WindowComponent>
        ))}

        <AudioPlayer></AudioPlayer>

        <Navbar />
      </div>
    </>
  );
}
console.log('7.css loaded:', document.styleSheets.length);
Array.from(document.styleSheets).forEach(sheet => {
  console.log(sheet.href);
});
export default App;