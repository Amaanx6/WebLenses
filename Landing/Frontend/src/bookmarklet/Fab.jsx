import { useState } from 'react'
import { Scanner } from './Scanner'

export function Fab() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <button
        onClick={() => setVisible(!visible)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 99999,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: '#2196F3',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        Scan
      </button>
      
      {visible && <Scanner onClose={() => setVisible(false)} />}
    </>
  )
}