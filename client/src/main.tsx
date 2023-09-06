import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes/routes.tsx';
import ReactDOM from 'react-dom/client';
import store from './redux/store';
import React from 'react';
import './style/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
