import {Button} from "@/components/ui/button.jsx";
import {AlignJustify, LoaderCircle, LogOut} from "lucide-react";
import PropTypes from "prop-types";
import {adminLogout} from "@/services/auth.service.js";
import {useDispatch} from "react-redux";
import {authCheck} from "@/store/authSlice.js";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function AdminHeader({setSidebarOpen}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        const response = await adminLogout();
        if (response.success) {
            await dispatch(authCheck());
            navigate("/admin/login");
        }
        setLoading(false);
    }

    return (
        <header className="flex items-center justify-between px-4 py-5 bg-background border-b h-[80px]">
            <Button className="lg:hidden sm:block cursor-pointer bg-primary" onClick={() => setSidebarOpen(true)}>
                <AlignJustify/>
            </Button>
            <div className="flex flex-1 justify-end">
                <Button
                    className="flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium cursor-pointer bg-primary"
                    disabled={loading}
                    onClick={handleLogout}
                >
                    {loading ? (
                        <div className="animate-spin flex-center">
                            <LoaderCircle/>
                        </div>
                    ) : (
                        <>
                            <LogOut/>
                            Logout
                        </>
                    )}
                </Button>
            </div>
        </header>
    )
}


AdminHeader.propTypes = {
    setSidebarOpen: PropTypes.func,
};

export default AdminHeader;