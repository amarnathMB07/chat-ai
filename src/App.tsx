import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import './index.css';

export type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
      <ChatArea 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
      />
    </div>
  );
}

export default App;
