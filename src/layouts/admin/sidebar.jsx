import {BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet.jsx";
import PropTypes from "prop-types";

const adminSidebarMenuItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboard />,
    },
    {
        id: "products",
        label: "Products",
        path: "/admin/products",
        icon: <ShoppingBasket />,
    },
    {
        id: "order",
        label: "Orders",
        path: "/admin/order",
        icon: <BadgeCheck />,
    },
];

function AdminSideBar({ open, setOpen }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64 bg-primary text-white border-0">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="flex flex-col justify-center h-[80px] py-5 px-4">
                            <SheetTitle className="flex items-center gap-2 text-white">
                                <ChartNoAxesCombined size={28} />
                                <div className="text-2xl font-extrabold">Admin Panel</div>
                            </SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col items-center gap-1 mx-1">
                            {adminSidebarMenuItems.map((menuItem) => (
                                <div
                                    key={menuItem.id}
                                    onClick={() => {
                                        navigate(menuItem.path);
                                        setOpen(false);
                                    }}
                                    className={`flex cursor-pointer text-lg items-center gap-2 rounded-md py-2 px-4 w-full
                                        ${location.pathname.includes(menuItem.id)
                                        ? "bg-white text-primary"
                                        : "text-white hover:bg-white hover:text-primary"
                                    }`}
                                >
                                    {menuItem.icon}
                                    <span>{menuItem.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
            <aside className="hidden flex-col bg-primary text-white lg:flex w-64">
                <div className="flex items-center gap-2 py-5 px-4 mx-1 h-[80px]">
                    <ChartNoAxesCombined size={28}/>
                    <div className="text-2xl font-extrabold">Admin Panel</div>
                </div>
                <div className="flex flex-col items-start gap-1 mx-1">
                    {adminSidebarMenuItems.map((menuItem) => (
                        <div
                            key={menuItem.id}
                            onClick={() => navigate(menuItem.path)}
                            className={`flex cursor-pointer text-lg items-center gap-2 rounded-md py-2 px-4 w-full
                                        ${location.pathname.includes(menuItem.id)
                                ? "bg-white text-primary"
                                : "text-white hover:bg-white hover:text-primary"
                            }`}
                        >
                            {menuItem.icon}
                            <span>{menuItem.label}</span>
                        </div>
                    ))}
                </div>
            </aside>
        </>
    );
}

AdminSideBar.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
};

export default AdminSideBar;