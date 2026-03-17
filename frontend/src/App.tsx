import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import StoreDashboard from './pages/StoreDashboard';
import ConsumerDashboard from './pages/ConsumerDashboard';
import DeliveryDashboard from './pages/DeliveryDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/store" element={<StoreDashboard />} />
        <Route path="/consumer" element={<ConsumerDashboard />} />
        <Route path="/delivery" element={<DeliveryDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
