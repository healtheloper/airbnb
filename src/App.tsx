import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { theme } from '@common/theme';
import Layout from '@components/Layout';
import MainPage from '@pages/MainPage';

export default function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}
