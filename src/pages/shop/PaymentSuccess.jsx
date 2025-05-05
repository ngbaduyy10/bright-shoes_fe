import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <div className="flex-center flex-col gap-4 flex-1">
            <div className="text-4xl font-bold">Payment is successfully!</div>
            <Button asChild className="cursor-pointer w-[200px]">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        sessionStorage.setItem("activeTab", "order");
                        navigate("/account");
                    }}
                >
                    View Orders
                </motion.button>
            </Button>
        </div>
    );
}

export default PaymentSuccess;