import React from 'react';
import ReactDOM from 'react-dom/client';

// if (process.env.NODE_ENV === 'development')
// 원래는 개발환경에서만 쓰지만 백엔드 없이 작업하므로 그대로 진행
import { serviceWorker } from '@server/browser';

import App from './App';

serviceWorker.start();

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(<App />);
