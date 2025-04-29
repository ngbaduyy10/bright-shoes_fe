import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <div className="flex-center flex-col gap-4 flex-1">
            <div className="text-4xl font-bold">Payment is successfully!</div>
            <Button
                className="cursor-pointer w-[200px]"
                onClick={() => {
                    sessionStorage.setItem("activeTab", "order");
                    navigate("/account")
                }}>
                View Orders
            </Button>
        </div>
    );
}

export default PaymentSuccess;