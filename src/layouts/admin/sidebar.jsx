import {
    ShoppingBasket,
    ChartNoAxesCombined,
    LayoutDashboard,
    Footprints,
    User,
    TicketPercent,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet.jsx";
import PropTypes from "prop-types";
import {Input} from "@/components/ui/input.jsx";
import {motion} from "framer-motion";

const adminSidebarMenuItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboard />,
    },
    {
        id: "user",
        label: "Users",
        path: "/admin/user",
        icon: <User />,
    },
    // {
    //     id: "feature",
    //     label: "Features",
    //     path: "/admin/feature",
    //     icon: <Wallpaper />,
    // },
    {
        id: "shoes",
        label: "Shoes",
        path: "/admin/shoes",
        icon: <Footprints />,
    },
    {
        id: "order",
        label: "Orders",
        path: "/admin/order",
        icon: <ShoppingBasket />,
    },
    {
        id: "discount",
        label: "Discount",
        path: "/admin/discount",
        icon: <TicketPercent />,
    },
];

function AdminSideBar({ open, setOpen }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64 bg-primary text-white border-0 rounded-lg">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="flex flex-col justify-center h-[80px] py-5 px-4">
                            <SheetTitle className="flex items-center gap-3 text-white">
                                <ChartNoAxesCombined size={28} />
                                <div className="text-2xl font-extrabold">Admin Panel</div>
                            </SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col items-center gap-1 mx-2">
                            <div className="py-2 w-full">
                                <Input type="text" placeholder="Search..." className="border-0 bg-[#3D3350] h-[50px] px-4 placeholder:text-white" />
                            </div>
                            {adminSidebarMenuItems.map((menuItem) => {
                                const isActive = location.pathname.includes(menuItem.id);
                                return (
                                    <motion.div
                                        key={menuItem.id}
                                        onClick={() => {
                                            navigate(menuItem.path);
                                            setOpen(false);
                                        }}
                                        initial={false}
                                        whileHover={{
                                            scale: 1.03,
                                            backgroundColor: isActive ? "#ffffff" : "#ffffff20",
                                            color: isActive ? "black" : "#ffffff",
                                        }}
                                        animate={{
                                            backgroundColor: isActive ? "#ffffff" : "transparent",
                                            color: isActive ? "black" : "#ffffff",
                                        }}
                                        transition={{type: "spring", stiffness: 300, damping: 20}}
                                        className="flex cursor-pointer text-md items-center gap-3 rounded-md py-3 px-4 w-full"
                                    >
                                        {menuItem.icon}
                                        <span>{menuItem.label}</span>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
            <aside className="fixed left-0 top-0 h-full hidden flex-col bg-primary text-white lg:flex w-64 rounded-lg">
                <div className="flex items-center gap-3 py-5 px-4 mx-1 h-[80px]">
                    <ChartNoAxesCombined size={28}/>
                    <div className="text-2xl font-extrabold">Admin Panel</div>
                </div>
                <div className="flex flex-col items-start gap-1 mx-2">
                    <div className="py-2 w-full">
                        <Input type="text" placeholder="Search..."
                               className="border-0 bg-[#3D3350] h-[50px] px-4 placeholder:text-white"/>
                    </div>
                    {adminSidebarMenuItems.map((menuItem) => {
                        const isActive = location.pathname.includes(menuItem.id);
                        return (
                            <motion.div
                                key={menuItem.id}
                                onClick={() => navigate(menuItem.path)}
                                initial={false}
                                whileHover={{
                                    scale: 1.03,
                                    backgroundColor: isActive ? "#ffffff" : "#ffffff20",
                                    color: isActive ? "black" : "#ffffff",
                                }}
                                animate={{
                                    backgroundColor: isActive ? "#ffffff" : "transparent",
                                    color: isActive ? "black" : "#ffffff",
                                }}
                                transition={{type: "spring", stiffness: 300, damping: 20}}
                                className="flex cursor-pointer text-md items-center gap-3 rounded-md py-3 px-4 w-full"
                            >
                                {menuItem.icon}
                                <span>{menuItem.label}</span>
                            </motion.div>
                        )
                    })}
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