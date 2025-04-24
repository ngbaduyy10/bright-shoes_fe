import {useEffect, useState} from 'react';
import {getAllOrders} from "@/services/order.service.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {dayjsDate} from "@/utils/dayjsConfig.js";
import {getStatusColor} from "@/utils/index.js";
import AdminOrderDetail from "@/components/AdminOrderDetail.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";

const AdminOrder = () => {
    const [orderList, setOrderList] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            const response = await getAllOrders();
            if (response.success) {
                setOrderList(response.data);
            }
            setLoading(false);
        };

        fetchOrders();
    }, [reload]);

    const handleViewDetail = (order) => {
        setSelectedOrder(order);
        setDialogOpen(true);
    }

    return (
        <>
            <Card className="min-h-[300px]">
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-white">
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
                            {loading ? (
                                <>
                                    {Array(10).fill(0).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                            <TableCell className="text-center"><Skeleton className="h-4 w-20 mx-auto" /></TableCell>
                                            <TableCell className="text-center"><Skeleton className="h-6 w-20 mx-auto rounded-full" /></TableCell>
                                            <TableCell className="text-center"><Skeleton className="h-4 w-16 mx-auto" /></TableCell>
                                            <TableCell className="text-center"><Skeleton className="h-8 w-24 mx-auto rounded-md" /></TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {orderList.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell>{order?.id}</TableCell>
                                            <TableCell className="text-center">
                                                {dayjsDate(order?.created_at)}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge className={`py-1 px-3 ${getStatusColor(order?.status)}`}>
                                                    {order?.status.toUpperCase()}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">${order?.discount_bill || order?.total_bill}</TableCell>
                                            <TableCell className="text-center">
                                                <Button className="cursor-pointer" onClick={() => handleViewDetail(order)}>
                                                    View Details
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {selectedOrder &&
                <AdminOrderDetail
                    setOpen={setDialogOpen}
                    open={dialogOpen}
                    order={selectedOrder}
                    reload={reload}
                    setReload={setReload}
                />
            }
        </>
    );
}

export default AdminOrder;