import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Dashboard route will be added here in Phase 4 */}
      {/* <Route path="/dashboard/:username" element={<DashboardPage />} /> */}
    </Routes>
  );
}

export default App;
