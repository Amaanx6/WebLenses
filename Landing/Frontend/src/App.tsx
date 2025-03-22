import './App.css'
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Landing from './Components/Landing/Main-Landing';
import {SnapShotHome} from './Components/SnapShot/SnapShotHome'

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          
          <Route path="/" element={<Landing />} />
          <Route path="/mind" element={<SnapShotHome />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
};

export default App;