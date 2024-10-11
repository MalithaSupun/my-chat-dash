import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import WrenConnect from './pages/WrenConnect';
import AnalysistTask from './pages/AnalysistTask';
import AdminTasks from './pages/AdminTasks';

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard Layout with Outlet for child routes */}
        <Route path="/" element={<Dashboard />}>
          {/* Child routes */}
          <Route path="wren-connect" element={<WrenConnect />} />
          <Route path="analysist-task" element={<AnalysistTask />} />
          <Route path="admin-tasks" element={<AdminTasks />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
