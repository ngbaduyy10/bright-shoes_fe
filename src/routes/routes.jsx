import ShopLayout from "@/layouts/shop/index.jsx";
import Home from "@/pages/shop/Home.jsx";
import Collection from "@/pages/shop/Collection.jsx";
import Contact from "@/pages/shop/Contact.jsx";
import Login from "@/pages/shop/Login.jsx";
import Register from "@/pages/shop/Register.jsx";
import Detail from "@/pages/shop/Detail.jsx";
import Checkout from "@/pages/shop/Checkout.jsx";
import Account from "@/pages/shop/Account.jsx";
import PaymentSuccess from "@/pages/shop/PaymentSuccess.jsx";
import AdminLogin from "@/pages/admin/AdminLogin.jsx";
import AuthCheck from "@/components/AuthCheck.jsx";
import AdminLayout from "@/layouts/admin/index.jsx";
import User from "@/pages/admin/User.jsx";
import Unauthorized from "@/pages/Unauthorized.jsx";
import AdminOrder from "@/pages/admin/Order.jsx";
import Dashboard from "@/pages/admin/Dashboard.jsx";
import Shoes from "@/pages/admin/Shoes.jsx";
import NotFound from "@/pages/NotFound.jsx";
import Discount from "@/pages/admin/Discount.jsx";
import Feature from "@/pages/admin/Feature.jsx";

const routes = [
    {
        element: <ShopLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/collection",
                element: <Collection />
            },
            {
                path: "/detail/:shoesId",
                element: <Detail />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/account",
                element: <Account />
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
            {
                path: "/payment-success",
                element: <PaymentSuccess />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },
    {
        element: <AuthCheck />,
        children: [
            {
                path: "/admin/login",
                element: <AdminLogin />
            },
            {
                element: <AdminLayout />,
                children: [
                    {
                        path: "/admin",
                    },
                    {
                        path: "/admin/dashboard",
                        element: <Dashboard />
                    },
                    {
                        path: "/admin/user",
                        element: <User />
                    },
                    {
                        path: "/admin/feature",
                        element: <Feature />
                    },
                    {
                        path: "/admin/shoes",
                        element: <Shoes />
                    },
                    {
                        path: "/admin/order",
                        element: <AdminOrder />
                    },
                    {
                        path: "/admin/discount",
                        element: <Discount />
                    }
                ]
            }
        ]
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />
    },
    {
        path: "*",
        element: <NotFound />
    }
]

export default routes;