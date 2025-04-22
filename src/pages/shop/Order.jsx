import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.jsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getOrdersByUserId } from "@/services/order.service.js";
import { dayjsDate } from "@/utils/dayjsConfig.js";
import OrderDetail from "@/components/OrderDetail.jsx";
import { LoaderCircle } from "lucide-react";
import { getStatusColor } from "@/utils/index.js";

const Order = () => {
    const { user } = useUser();
    const [orderList, setOrderList] = useState([]);
    const [orderDetailOpen, setOrderDetailOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrderList = async () => {
            setLoading(true);
            const response = await getOrdersByUserId(user.id);
            if (response.success) {
                setOrderList(response.data);
            }
            setLoading(false);
        };
        if (user) {
            fetchOrderList();
        }
    }, [user]);

    const handleViewDetail = (order) => {
        setSelectedOrder(order);
        setOrderDetailOpen(true);
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Order History</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="animate-spin flex-center">
                            <LoaderCircle />
                        </div>
                    ) : (
                        <>
                            {orderList.length === 0 ? (
                                <div className="text-lg text-gray-500">
                                    No orders found
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-white">
                                            <TableHead className="font-semibold">
                                                Order ID
                                            </TableHead>
                                            <TableHead className="text-center font-semibold">
                                                Date
                                            </TableHead>
                                            <TableHead className="text-center font-semibold">
                                                Status
                                            </TableHead>
                                            <TableHead className="text-center font-semibold">
                                                Total Bill
                                            </TableHead>
                                            <TableHead className="text-center font-semibold">
                                                <span className="sr-only">
                                                    Details
                                                </span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orderList.map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell>
                                                    {order?.id}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {dayjsDate(
                                                        order?.created_at,
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Badge
                                                        className={`py-1 px-3 ${getStatusColor(order?.status)}`}
                                                    >
                                                        {order?.status.toUpperCase()}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    ${order?.total_bill}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Button
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            handleViewDetail(
                                                                order,
                                                            )
                                                        }
                                                    >
                                                        View Details
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
            {selectedOrder && (
                <OrderDetail
                    open={orderDetailOpen}
                    setOpen={setOrderDetailOpen}
                    order={selectedOrder}
                />
            )}
        </>
    );
};

export default Order;
