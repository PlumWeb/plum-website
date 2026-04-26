// Background.tsx
import React from 'react';
import backgroundImage from './assets/asadal.jpg';

const Background: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1
      }}
    >
      {children}
    </div>
  );
};

export default Background;