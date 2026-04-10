import { Routes, Route } from 'react-router-dom';
import Portfolio from './pages/public/Portfolio';
import AdminLayout from './pages/admin/AdminLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin/*" element={<AdminLayout />} />
    </Routes>
  );
}

export default App;
