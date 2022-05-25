import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { theme } from '@common/theme';
import Layout from '@components/Layout';
import color from '@constants/color';
import MainPage from '@pages/MainPage';

function MyGlobalStyles() {
  return (
    <GlobalStyles
      styles={{
        body: {
          backgroundColor: color.bgColor,
          color: color.grey1,
        },
      }}
    />
  );
}

export default function App() {
  return (
    <div className="App">
      <CssBaseline />
      <MyGlobalStyles />
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
