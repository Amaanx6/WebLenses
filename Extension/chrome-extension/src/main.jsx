import { useState } from 'react';
import Analyzer from './components/Analyzer';

export default function App() {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 999999
    }}>
      <button 
        onClick={() => setVisible(!visible)}
        style={{
          background: '#4285f4',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}
      >
        🔮
      </button>
      {visible && <Analyzer />}
    </div>
  );
}