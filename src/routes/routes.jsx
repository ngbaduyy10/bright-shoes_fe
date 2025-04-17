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
        path: "/admin/login",
        element: <AdminLogin />
    },
    {
        element: <AuthCheck />,
        children: [
            {
                element: <AdminLayout />,
                children: [
                    {
                        path: "/admin/user",
                        element: <User />
                    }
                ]
            }
        ]
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />
    }
]

export default routes;