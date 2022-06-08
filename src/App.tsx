import { CssBaseline } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { theme } from '@common/theme';
import Layout from '@components/Layout';
import color from '@constants/color';
import { HeaderProvider, useHeaderState } from '@contexts/HeaderProvider';
import MainPage from '@pages/MainPage';
import SearchResultPage from '@pages/SearchResultPage';

function MyGlobalStyles() {
  const { isFocus } = useHeaderState();

  return (
    <GlobalStyles
      styles={{
        body: {
          color: color.grey1,
          ...(isFocus && { backgroundColor: color.bgColor }),
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
      <HeaderProvider>
        <MyGlobalStyles />
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path="rooms" element={<SearchResultPage />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </HeaderProvider>
    </div>
  );
}
