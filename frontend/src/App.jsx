import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import OperatorDashboard from './pages/OperatorDashboard';
import PlayerDashboard from './pages/PlayerDashboard';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/operator" element={<OperatorDashboard />} />
        <Route path="/player" element={<PlayerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
