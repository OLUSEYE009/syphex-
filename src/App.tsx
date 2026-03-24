import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import TestDrive from './pages/TestDrive';
import Support from './pages/Support';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/test-drive" element={<TestDrive />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </Router>
  );
}

export default App;

