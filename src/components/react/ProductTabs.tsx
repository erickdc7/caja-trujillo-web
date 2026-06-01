import { useState, type ReactNode } from 'react';

interface Tab {
  label: string;
  panelId: string;
}

interface Props {
  tabs: Tab[];
  children: ReactNode[];
}

export default function ProductTabs({ tabs, children }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.panelId ?? '');

  return (
    <div>
      {/* Tab list */}
      <div style={styles.tabList} role="tablist" aria-label="Categorías de productos">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.panelId;
          return (
            <button
              key={tab.panelId}
              role="tab"
              id={`tab-${tab.panelId}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.panelId}`}
              onClick={() => setActiveTab(tab.panelId)}
              style={{
                ...styles.tab,
                ...(isActive ? styles.tabActive : styles.tabInactive),
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#FFF5F5';
                  e.currentTarget.style.color = '#FF0901';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#7A7A88';
                }
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panels */}
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.panelId;
        return (
          <div
            key={tab.panelId}
            id={`panel-${tab.panelId}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.panelId}`}
            style={{ display: isActive ? 'grid' : 'none' }}
          >
            {children[index]}
          </div>
        );
      })}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  tabList: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '1px solid #E0E0E8',
    padding: 5,
    borderRadius: 14,
    width: 'fit-content',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    gap: 2,
    marginBottom: 28,
  },
  tab: {
    padding: '9px 22px',
    fontSize: 13.5,
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap' as const,
    lineHeight: 1,
  },
  tabActive: {
    backgroundColor: '#FF0901',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(255,9,1,0.25)',
  },
  tabInactive: {
    backgroundColor: 'transparent',
    color: '#7A7A88',
  },
};
