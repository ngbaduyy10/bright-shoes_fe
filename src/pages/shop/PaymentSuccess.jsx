import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <Card className="p-10">
            <CardHeader className="p-0">
                <CardTitle className="text-4xl">Payment is successfully!</CardTitle>
            </CardHeader>
            <Button className="cursor-pointer w-[200px]" onClick={() => navigate("/account")}>
                View Orders
            </Button>
        </Card>
    );
}

export default PaymentSuccess;