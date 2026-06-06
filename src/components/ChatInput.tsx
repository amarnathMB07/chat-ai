import { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function ChatInput({ onSendMessage, disabled }: { onSendMessage: (msg: string) => void, disabled: boolean }) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [text]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (text.trim() && !disabled) {
        onSendMessage(text);
        setText('');
      }
    }
  };

  return (
    <div style={{
      position: 'relative',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: '1rem',
      border: '1px solid var(--border-color)',
      padding: '0.75rem 1rem',
      display: 'flex',
      alignItems: 'flex-end',
      boxShadow: '0 0 15px rgba(0,0,0,0.1)'
    }}>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message ChatGPT clone..."
        disabled={disabled}
        rows={1}
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          border: 'none',
          color: 'var(--text-primary)',
          fontSize: '1rem',
          resize: 'none',
          outline: 'none',
          maxHeight: '200px',
          overflowY: 'auto',
          fontFamily: 'inherit',
          paddingRight: '3rem'
        }}
      />
      <button
        onClick={() => {
          if (text.trim() && !disabled) {
            onSendMessage(text);
            setText('');
          }
        }}
        disabled={!text.trim() || disabled}
        style={{
          position: 'absolute',
          right: '0.75rem',
          bottom: '0.75rem',
          backgroundColor: text.trim() && !disabled ? 'var(--text-primary)' : 'var(--border-color)',
          color: text.trim() && !disabled ? 'var(--bg-primary)' : 'var(--text-secondary)',
          border: 'none',
          borderRadius: '0.5rem',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: text.trim() && !disabled ? 'pointer' : 'default',
          transition: 'background-color 0.2s'
        }}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}
