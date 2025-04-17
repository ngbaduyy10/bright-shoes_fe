import {Button} from "@/components/ui/button.jsx";
import {AlignJustify, LogOut} from "lucide-react";
import PropTypes from "prop-types";
import {adminLogout} from "@/services/auth.service.js";
import {useNavigate} from "react-router-dom";

function AdminHeader({setSidebarOpen}) {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const response = await adminLogout();
        if (response.success) {
            navigate("/admin/login", {replace: true});
        }
    }

    return (
        <header className="flex items-center justify-between px-4 py-5 bg-background border-b h-[80px]">
            <Button className="lg:hidden sm:block cursor-pointer bg-primary" onClick={() => setSidebarOpen(true)}>
                <AlignJustify/>
            </Button>
            <div className="flex flex-1 justify-end">
                <Button
                    className="flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium cursor-pointer bg-primary"
                    onClick={handleLogout}
                >
                    <LogOut/>
                    Logout
                </Button>
            </div>
        </header>
    )
}


AdminHeader.propTypes = {
    setSidebarOpen: PropTypes.func,
};

export default AdminHeader;