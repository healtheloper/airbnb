import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '@components/Layout';

import MainPage from './pages/MainPage';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
