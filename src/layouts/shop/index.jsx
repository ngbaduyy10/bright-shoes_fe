import { Outlet } from "react-router-dom";
import ShopNavbar from "@/layouts/shop/navbar.jsx";
import ShopFooter from "@/layouts/shop/footer.jsx";

const ShopLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <ShopNavbar />
            <main className="flex flex-col w-full flex-1">
                <Outlet/>
            </main>
            <ShopFooter />
        </div>
    )
}

export default ShopLayout;