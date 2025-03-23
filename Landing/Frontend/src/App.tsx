import './App.css'
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Landing from './Components/Landing/Main-Landing';
import {SnapShotHome} from './Components/SnapShot/SnapShotHome'
import { DiffArchive } from './Components/DiffArchive/DiffArchive';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          
          <Route path="/" element={<Landing />} />
          <Route path="/mind" element={<SnapShotHome />} />
          <Route path="/Diff" element={<DiffArchive />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
};

export default App;