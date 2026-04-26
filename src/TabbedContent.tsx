// src/components/TabbedContent.tsx
import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabbedContentProps {
  tabs: Tab[];
}

const TabbedContent: React.FC<TabbedContentProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  return (
    <>
      <menu role="tablist" aria-label="Window with Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-controls={tab.id}
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </menu>
      {tabs.map((tab) => (
        <article
          key={tab.id}
          role="tabpanel"
          id={tab.id}
          hidden={activeTab !== tab.id}
        >
          {tab.content}
        </article>
      ))}
    </>
  );
};

export default TabbedContent;