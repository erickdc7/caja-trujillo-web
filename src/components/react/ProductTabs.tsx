import { useState, useEffect, useRef } from 'react';

interface Tab {
  label: string;
  panelId: string;
}

interface Props {
  tabs: Tab[];
  children: React.ReactNode;
}

export default function ProductTabs({ tabs, children }: Props) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.panelId ?? '');
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Sync visible panel with activeTab via DOM ── */
  useEffect(() => {
    if (!containerRef.current) return;
    const panels = containerRef.current.querySelectorAll<HTMLElement>('[data-panel]');
    panels.forEach((panel) => {
      const id = panel.getAttribute('data-panel');
      if (id === activeTab) {
        panel.style.display = 'grid';
        panel.removeAttribute('hidden');
      } else {
        panel.style.display = 'none';
        panel.setAttribute('hidden', '');
      }
    });
  }, [activeTab]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = tabs.findIndex((t) => t.panelId === activeTab);
    let newIndex = currentIndex;
    if (e.key === 'ArrowRight') {
      newIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = tabs.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setActiveTab(tabs[newIndex].panelId);
    const btn = document.getElementById(`tab-${tabs[newIndex].panelId}`);
    if (btn) btn.focus();
  }

  return (
    <div ref={containerRef}>
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
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.panelId)}
              onKeyDown={handleKeyDown}
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

      {/* Panels — Astro renders slotted content here as static HTML */}
      <div>{children}</div>
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
    flexWrap: 'wrap' as const,
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
