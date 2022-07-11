// auth
import Login from "../containers/auth/pages/Login";
import Register from "../containers/auth/pages/Register";
import ResetPassword from "../containers/auth/pages/ResetPassword";
import AddUser from "../containers/users/pages/AddUser";

// users
import ListUsers from "../containers/users/pages/ListUsers";

export const publicRoutes = [
    {
        path: '/login',
        component: <Login />,
        title: 'Login'
    },
    {
        path: '/register',
        component: <Register />,
        title: 'Login'
    },
    {
        path: '/reset-password/:token',
        component: <ResetPassword />,
        title: 'Reset Password'
    },
];

export const protecedRoutes = [
    {
        path: '/',
        component: <ListUsers />,
        title: 'List Users'
    },
    {
        path: '/users/:id',
        component: <AddUser />,
        title: 'Edit / Add Users'
    }
]
