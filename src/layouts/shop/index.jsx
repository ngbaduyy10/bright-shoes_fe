import { Outlet } from "react-router-dom";
import ShopNavbar from "@/layouts/shop/navbar.jsx";
import ShopFooter from "@/layouts/shop/footer.jsx";

const ShopLayout = () => {
    return (
        <div className="flex flex-col">
            <ShopNavbar />
            <main className="flex flex-col w-full min-h-[500px]">
                <Outlet/>
            </main>
            <ShopFooter />
        </div>
    )
}

export default ShopLayout;