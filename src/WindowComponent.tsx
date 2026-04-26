import React, { useState, useRef } from 'react';
import './WindowComponent.css';

interface WindowComponentProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const WindowComponent: React.FC<WindowComponentProps> = ({ title, onClose, children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.title-bar-controls')) return;
    
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={windowRef}
      className="window win7"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="title-bar" onMouseDown={handleMouseDown}>
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close" className="is-close" onClick={onClose}></button>
        </div>
      </div>

      <div className="window-body has-space">
        {children}
      </div>

      {/* ✅ Status bar removed */}
    </div>
  );
};

export default WindowComponent;