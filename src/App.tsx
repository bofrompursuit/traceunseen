import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import { ScrollToAnchor } from './landing/ScrollToAnchor';

export default function App() {
  return (
    <>
      <ScrollToAnchor />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Dashboard />} />
      </Routes>
    </>
  );
}
