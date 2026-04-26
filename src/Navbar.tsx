import { useState, useEffect } from 'react';
import './Navbar.css';
import windowsLogo from './assets/windowslogo.jpg';

const Navbar = () => {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit'
      });
      
      const dateString = now.toLocaleDateString([], {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      });

      setTime(timeString);
      setDate(dateString);
    };

    updateTime(); // Run immediately
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="taskbar">
      
      {/* Windows Start Button */}
      <div className="taskbar-start">
        <button className="start-button">
          <img 
            src={windowsLogo} 
            alt="Start" 
            className="start-logo"
          />
          <span>Start</span>
        </button>
      </div>

      {/* Middle taskbar area */}
      <div className="taskbar-middle">
        {/* Open windows/pinned apps would go here */}
      </div>

      {/* Right side - Clock */}
      <div className="taskbar-right">
        <div className="taskbar-clock">
          <span className="clock-time">{time}</span>
          <span className="clock-date">{date}</span>
        </div>
      </div>

    </div>
  );
};

export default Navbar;