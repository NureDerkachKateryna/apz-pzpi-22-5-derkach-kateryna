import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import ProductDashboard from "../../features/products/dashboard/ProductDashboard";
import ProductDetail from "../../features/products/details/ProductDetail";
import RequireAuth from "./RequireAuth";
import UserProductsDashboard from "../../features/products/userProducts/UserProductsDashboard";
import MyRoutinesDashboard from "../../features/skincareRoutines/dashboard/MyRoutinesDashboard";
import MyRoutineDetails from "../../features/skincareRoutines/details/MyRoutineDetails";
import ProductForm from "../../features/products/form/ProductForm";
import BansDashboard from "../../features/products/bans/BansDashboard";
import ProfileHeader from "../../features/profile/ProfileHeader";
import ProfileForm from "../../features/profile/form/ProfileForm";
import ChangePasswordForm from "../../features/profile/form/ChangePasswordForm";
import ProductsTable from "../../features/products/table/ProductsTable";
import UsersTable from "../../features/users/UserTable";
import AppointmentPage from "../../features/appointments/AppointmentPage";
import MyDermatologistPage from "../../features/appointments/MyDermatologistPage";
import UserRoutinesTable from "../../features/users/UserRoutinesTable";
import RoutinesDashboard from "../../features/skincareRoutines/dashboard/RoutinesDashboard";
import RoutineDetails from "../../features/skincareRoutines/details/RoutineDetails";
import AddProductToRoutinePage from "../../features/products/form/AddProductToRoutinePage";
import RequireAdmin from "./RequireAdmin";
import RequireCustomer from "./RequireCustomer";
import RequireDermatologist from "./RequireDermatologist";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: 'products', element: <ProductDashboard /> },
                    { path: 'products/:id', element: <ProductDetail /> },
                    { path: 'profile', element: <ProfileHeader /> },
                    { path: 'editUser/:id', element: <ProfileForm /> },
                    { path: 'changePassword/:id', element: <ChangePasswordForm /> },
                    { path: 'users', element: <UsersTable /> },
                    {
                        element: <RequireAdmin />, children: [
                            { path: 'allProducts', element: <ProductsTable /> },
                            { path: 'createProduct', element: <ProductForm /> },
                            { path: 'editProduct/:id', element: <ProductForm /> },
                        ]
                    },
                    {
                        element: <RequireCustomer />, children: [
                            { path: 'makeAppointment', element: <AppointmentPage />},
                            { path: 'myDermatologist', element: <MyDermatologistPage />},
                            {path: 'myProducts', element: <UserProductsDashboard />},
                            {path: 'myRoutines', element: <MyRoutinesDashboard />},
                            {path: 'myRoutines/:id', element: <MyRoutineDetails />},
                            { path: 'bans', element: <BansDashboard /> },
                        ]
                    },
                    {
                        element: <RequireDermatologist />, children: [
                            { path: 'myCustomers', element: <UserRoutinesTable />},
                            {path: 'routines/:userId', element: <RoutinesDashboard />},
                            {path: 'routines/:userId/details/:id', element: <RoutineDetails />},
                            {path: 'routines/:userId/details/addProduct', element: <AddProductToRoutinePage />},
                        ]
                    },
                ]
            },
            { path: '', element: <HomePage /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: 'login', element: <LoginForm /> },
            { path: 'register', element: <RegisterForm /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]
    }
])