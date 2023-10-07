import { createBrowserRouter } from 'react-router-dom';
import ProductDetails from '@/pages/ProductDetails';
import PageNotFound from '@/pages/PageNotFound';
import PrivateRoute from './PrivateRoute';
import Products from '@/pages/Products';
import Checkout from '@/pages/Checkout';
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import App from '@/App';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/product-details/:id',
        element: <ProductDetails />,
      },
      {
        path: '/checkout',
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export default routes;
