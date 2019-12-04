import Home from '../components/Home';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import AdminCategories from '../components/AdminCategories';
import Profile from '../components/Profile';
import AdminProducts from '../components/AdminProducts';
import App from './../App';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/login',
        name: 'login',
        exact: true,
        component: Login
      },
      {
        path: '/admin/categories',
        exact: true,
        component: AdminCategories,
        routes: [
          {
            path: '/admin/categories/aaaa',
            component: Home,
            exact: true
          }
        ]
      },
      {
        path: '/profile',
        name: 'profile',
        exact: true,
        component: Profile
      },
      {
        path: '/admin/products',
        name: 'admin_products',
        component: AdminProducts
      },
      {
        path: '',
        exact: true,
        component: NotFound
      }
    ]
  }
];

export default routes;
