import { MessageSquare, Plus, PanelLeftClose } from 'lucide-react';

export function Sidebar({ onClose, onNewChat }: { onClose: () => void, onNewChat: () => void }) {
  return (
    <div style={{
      width: '260px',
      backgroundColor: 'var(--bg-sidebar)',
      display: 'flex',
      flexDirection: 'column',
      padding: '0.5rem',
      transition: 'width 0.3s ease',
      color: 'var(--text-primary)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <button onClick={onNewChat} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flex: 1,
          padding: '0.75rem',
          backgroundColor: 'transparent',
          border: '1px solid var(--border-color)',
          borderRadius: '0.375rem',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          textAlign: 'left'
        }}>
          <Plus size={16} />
          New chat
        </button>
        <button onClick={onClose} style={{
          padding: '0.75rem',
          backgroundColor: 'transparent',
          border: '1px solid var(--border-color)',
          borderRadius: '0.375rem',
          color: 'var(--text-primary)',
          cursor: 'pointer'
        }} title="Close sidebar">
          <PanelLeftClose size={16} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', padding: '0.75rem' }}>
          Today
        </div>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          width: '100%',
          padding: '0.75rem',
          backgroundColor: 'var(--bg-secondary)',
          border: 'none',
          borderRadius: '0.375rem',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          textAlign: 'left'
        }}>
          <MessageSquare size={16} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Current Chat
          </span>
        </button>
      </div>
    </div>
  );
}
