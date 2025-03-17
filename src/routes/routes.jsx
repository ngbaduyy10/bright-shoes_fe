import ShopLayout from "@/layouts/shop/index.jsx";
import Home from "@/pages/shop/Home.jsx";
import Collection from "@/pages/shop/Collection.jsx";
import Contact from "@/pages/shop/Contact.jsx";
import Login from "@/pages/shop/Login.jsx";
import Register from "@/pages/shop/Register.jsx";
import Detail from "@/pages/shop/Detail.jsx";
import Checkout from "@/pages/shop/Checkout.jsx";
import Account from "@/pages/shop/Account.jsx";

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
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    }
]

export default routes;