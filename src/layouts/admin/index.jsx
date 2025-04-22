import {useState} from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "@/layouts/admin/header.jsx";
import AdminSidebar from "@/layouts/admin/sidebar.jsx";

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen w-full">
            <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <div className="flex flex-1 flex-col lg:pl-64">
                <AdminHeader setSidebarOpen={setSidebarOpen} />
                <main className="flex-1 flex-col flex p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;