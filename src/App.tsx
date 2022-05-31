import { CssBaseline } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { theme } from '@common/theme';
import Chart from '@components/Chart';
import Layout from '@components/Layout';
import color from '@constants/color';
import { HeaderProvider } from '@contexts/HeaderProvider';
import MainPage from '@pages/MainPage';

function MyGlobalStyles() {
  return (
    <GlobalStyles
      styles={{
        body: {
          backgroundColor: color.bgColor,
          color: color.grey1,
        },
        ul: {
          listStyle: 'none',
          paddingLeft: 0,
        },
        button: {
          margin: 0,
          padding: 0,
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
        },
        h5: {
          margin: 0,
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
        <HeaderProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Chart />}>
                <Route index element={<MainPage />} />
              </Route>
            </Routes>
          </Router>
        </HeaderProvider>
      </ThemeProvider>
    </div>
  );
}
