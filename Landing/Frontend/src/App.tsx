import './App.css'
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Landing from './Components/Landing/Main-Landing';
import {MindmapPage} from './Components/Mindmap/MindmapPage'

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          
          <Route path="/" element={<Landing />} />
          <Route path="/mind" element={<MindmapPage />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
};

export default App;