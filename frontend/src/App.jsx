import './App.css';
import {Routes, Route } from 'react-router-dom';
import Financial_Page from './pages/Financial_Page';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Financial_Page />} />
      </Routes>
  );
}

export default App;
