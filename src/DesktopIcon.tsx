import React, { useState, useRef, useEffect } from 'react';
import './DesktopIcon.css';

interface DesktopIconProps {
  icon: React.ReactNode | string;
  label: string;
  onOpen: () => void;
  isWindowOpen?: boolean;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ 
  icon, 
  label, 
  onOpen,
  isWindowOpen = false 
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const clickTimeoutRef = useRef<number | null>(null);
  const clickCountRef = useRef(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (iconRef.current && !iconRef.current.contains(event.target as Node)) {
        setIsSelected(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    clickCountRef.current += 1;

    if (clickCountRef.current === 1) {
      // First click - select the icon
      setIsSelected(true);
      
      clickTimeoutRef.current = window.setTimeout(() => {
        clickCountRef.current = 0;
      }, 300); // Reset after 300ms if no second click
      
    } else if (clickCountRef.current === 2) {
      // Second click - open the window
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      clickCountRef.current = 0;
      onOpen();
    }
  };

  return (
    <div
      ref={iconRef}
      className={`desktop-icon ${isSelected ? 'selected' : ''} ${isWindowOpen ? 'window-open' : ''}`}
      onClick={handleClick}
    >
      <div className="icon-image">
        {typeof icon === 'string' ? (
          <img src={icon} alt={label} />
        ) : (
          icon
        )}
      </div>
      <div className="icon-label">{label}</div>
    </div>
  );
};

export default DesktopIcon;