"use client";

export type TabId = "home" | "analysis" | "content-gaps" | "archived" | "activity" | "run-log" | "config" | "curation";

interface Tab {
  id: TabId;
  label: string;
  count?: number;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tabId: TabId) => {
    e.preventDefault();
    onTabChange(tabId);
  };

  return (
    <div className="slds-tabs_default" style={{ width: '100%' }}>
      <ul className="slds-tabs_default__nav" role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <li
              key={tab.id}
              className={`slds-tabs_default__item ${isActive ? 'slds-is-active' : ''}`}
              role="presentation"
            >
              <a
                className="slds-tabs_default__link"
                role="tab"
                href={`#${tab.id}`}
                aria-selected={isActive}
                aria-controls={`tab-${tab.id}`}
                onClick={(e) => handleTabClick(e, tab.id)}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="slds-badge slds-m-left_x-small">
                    {tab.count}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
