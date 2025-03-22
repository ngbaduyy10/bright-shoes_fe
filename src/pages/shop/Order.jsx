import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button.jsx";
import {useEffect, useState} from "react";
import {useUser} from "@clerk/clerk-react";
import {getOrdersByUserId} from "@/services/order.service.js";
import {dayjsDate} from "@/utils/dayjsConfig.js";

const Order = () => {
    const { user } = useUser();
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        const fetchOrderList = async () => {
            const response = await getOrdersByUserId(user.id);
            if (response.success) {
                setOrderList(response.data);
            }
        }

        if (user) {
            fetchOrderList();
        }
    }, [user]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Order History</CardTitle>
            </CardHeader>
            <CardContent>
                {orderList.length === 0 ? (
                    <div className="text-lg text-gray-500">No orders found</div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-semibold">Order ID</TableHead>
                                <TableHead className="text-center font-semibold">Date</TableHead>
                                <TableHead className="text-center font-semibold">Status</TableHead>
                                <TableHead className="text-center font-semibold">Total Bill</TableHead>
                                <TableHead className="text-center font-semibold">
                                    <span className="sr-only">Details</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orderList.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order?.id}</TableCell>
                                    <TableCell className="text-center">
                                        {dayjsDate(order?.created_at)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge className="py-1 px-3 bg-green-500">
                                            {order?.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">${order?.total_bill}</TableCell>
                                    <TableCell className="text-center">
                                        {/*<Dialog open={orderDetailOpen} onOpenChange={() => setOrderDetailOpen(false)}>*/}
                                        {/*    <Button onClick={() => setOrderDetailOpen(true)}>*/}
                                        {/*        View Details*/}
                                        {/*    </Button>*/}
                                        {/*    <OrderDetail order={order} />*/}
                                        {/*</Dialog>*/}
                                        <Button className="cursor-pointer">
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    )
}

export default Order;