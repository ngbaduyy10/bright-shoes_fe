import {Outlet, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authCheck} from "@/store/authSlice";
import {Navigate} from "react-router-dom";
import {useState} from "react";
import {LoaderCircle} from "lucide-react";

const AuthCheck = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isAuth } = useSelector(state => state.auth);
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const fetchAuth = async () => {
            await dispatch(authCheck());
            setAuthChecked(true);
        };
        fetchAuth();
    }, [dispatch]);

    if (!authChecked) {
        return (
            <div className="flex-center h-screen">
                <div className="animate-spin flex-center">
                    <LoaderCircle size={50}/>
                </div>
            </div>
        );
    }

    if (location.pathname === "/admin") {
        if (!isAuth) {
            return <Navigate to="/admin/login" />;
        } else {
            return <Navigate to="/admin/dashboard" />;
        }
    }

    if (!isAuth && !location.pathname.includes("/login")) {
        return <Navigate to="/unauthorized" replace={true}/>;
    }
    if (isAuth && location.pathname.includes("/login")) {
        return <Navigate to="/admin/dashboard" replace={true}/>;
    }

    return <Outlet />;
}

AuthCheck.propTypes = {
    children: PropTypes.node,
}

export default AuthCheck;

