import {useEffect} from "react";
import {vnpayVerify} from "@/services/order.service.js";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";
import {clearCartSlice} from "@/store/cartSlice.js";
import {useUser} from "@clerk/clerk-react";
import {useDispatch} from "react-redux";

const VNPayVerify = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const params = new URLSearchParams(window.location.search);
    const vnp_ResponseCode = params.get("vnp_ResponseCode");
    const vnp_TxnRef = params.get("vnp_TxnRef");

    if (!vnp_ResponseCode || !vnp_TxnRef) {
        navigate("/");
    }

    useEffect(() => {
        const verifyVNPay = async () => {
            const response = await vnpayVerify(vnp_ResponseCode, vnp_TxnRef);
            if (response.success) {
                await dispatch(clearCartSlice(user.id));
                navigate(`/payment-success`);
                toast.success(response.message);
            } else {
                navigate(`/checkout`);
                toast.error(response.message);
            }
        };

        verifyVNPay();
    }, [vnp_ResponseCode, vnp_TxnRef, navigate, dispatch, user]);
}

export default VNPayVerify;