// MultiWindowApp.tsx
import React, { useState } from 'react';
import WindowComponent from './WindowComponent';

interface WindowData {
  id: string;
  title: string;
  content: React.ReactNode;
}

const MultiWindowApp: React.FC = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);

  const addWindow = (title: string, content: React.ReactNode) => {
    const id = Date.now().toString();
    setWindows([...windows, { id, title, content }]);
  };

  const removeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  return (
    <div>
      <button onClick={() => addWindow('New Window', <p>Content here</p>)}>
        Open New Window
      </button>

      {windows.map(win => (
        <WindowComponent
          key={win.id}
          title={win.title}
          onClose={() => removeWindow(win.id)}
        >
          {win.content}
        </WindowComponent>
      ))}
    </div>
  );
};

export default MultiWindowApp;