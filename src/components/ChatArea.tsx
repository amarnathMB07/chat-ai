import { useState, useRef, useEffect } from 'react';
import { PanelLeftOpen } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { generateChatResponse } from '../lib/gemini';
import type { Message } from '../App';

export function ChatArea({ onToggleSidebar, isSidebarOpen }: { onToggleSidebar: () => void, isSidebarOpen: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));

      const responseText = await generateChatResponse(history, text);
      
      const aiMessage: Message = { id: (Date.now() + 1).toString(), role: 'model', content: responseText };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      const errorMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        content: `**Error**: ${error.message || "Failed to generate response."}` 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)', position: 'relative' }}>
      {!isSidebarOpen && (
        <button 
          onClick={onToggleSidebar}
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            padding: '0.5rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            zIndex: 10
          }}
          title="Open sidebar"
        >
          <PanelLeftOpen size={24} />
        </button>
      )}

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '2rem' }}>
        {messages.length === 0 ? (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '2rem', color: 'var(--text-primary)' }}>How can I help you today?</h1>
          </div>
        ) : (
          messages.map(msg => (
            <ChatMessage key={msg.id} message={msg} />
          ))
        )}
        {isLoading && (
          <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <div className="animate-pulse" style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--text-secondary)' }}></div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--text-secondary)', animationDelay: '0.2s' }}></div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--text-secondary)', animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
