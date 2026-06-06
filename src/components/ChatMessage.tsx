import ReactMarkdown from 'react-markdown';
import { User, Sparkles } from 'lucide-react';
import type { Message } from '../App';

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div style={{
      padding: '1.5rem',
      backgroundColor: isUser ? 'transparent' : 'var(--bg-secondary)',
      borderBottom: '1px solid rgba(0,0,0,0.1)'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '1.5rem' }}>
        <div style={{
          width: '30px',
          height: '30px',
          borderRadius: '0.25rem',
          backgroundColor: isUser ? 'var(--accent-color)' : '#19c37d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {isUser ? <User size={20} color="white" /> : <Sparkles size={20} color="white" />}
        </div>
        <div style={{ flex: 1, minWidth: 0, color: 'var(--text-primary)', lineHeight: 1.6 }} className="markdown-body">
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <ReactMarkdown>{message.content}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
