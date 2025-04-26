import {Button} from "@/components/ui/button.jsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.jsx";
import {AlignJustify, LogOut, UserCog} from "lucide-react";
import PropTypes from "prop-types";
import {adminLogout} from "@/services/auth.service.js";
import {useDispatch, useSelector} from "react-redux";
import {authCheck} from "@/store/authSlice.js";
import {useNavigate} from "react-router-dom";
import default_avatar from "@/assets/default_avatar.avif";
import {getAdminRoleLabel} from "@/utils/index.js";

function AdminHeader({setSidebarOpen}) {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const response = await adminLogout();
        if (response.success) {
            await dispatch(authCheck());
            navigate("/admin/login");
        }
    }

    return (
        <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-background border-b h-[80px]">
            <Button className="lg:hidden sm:block cursor-pointer bg-primary" onClick={() => setSidebarOpen(true)}>
                <AlignJustify/>
            </Button>
            <div className="flex flex-1 justify-end">
                <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end">
                        <div className="font-bold text-lg">{user?.first_name} {user?.last_name}</div>
                        <div className="text-sm text-gray-500">{getAdminRoleLabel(user?.role)}</div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="bg-black w-12 h-12">
                                {user?.image_url ? (
                                    <AvatarImage src={user?.image_url} alt="avatar" className="bg-white cursor-pointer" />
                                ) : (
                                    <AvatarImage src={default_avatar} alt="avatar" className="bg-white cursor-pointer" />
                                )}
                                <AvatarFallback className="bg-primary text-white font-extrabold cursor-pointer">
                                    {user?.first_name[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Logged in as {user?.first_name} {user?.last_name}</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem className="cursor-pointer">
                                <UserCog className="mr-2 h-4 w-4"/>
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" color="red"/>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}


AdminHeader.propTypes = {
    setSidebarOpen: PropTypes.func,
};

export default AdminHeader;