import {Dialog, DialogContent, DialogFooter} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Label} from "@/components/ui/label.jsx";
import {dayjsDate} from "@/utils/dayjsConfig.js";
import {getStatusColor, paymentToString, statusOptions} from "@/utils/index.js";
import {Badge} from "@/components/ui/badge.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import OrderItem from "@/components/OrderItem.jsx";
import PropTypes from "prop-types";
import {useState, useEffect} from "react";
import {updateOrderStatus} from "@/services/order.service.js";
import {toast} from "sonner";

const AdminOrderDetail = ({ open, setOpen, order, reload, setReload }) => {
    const [selectedStatus, setSelectedStatus] = useState(order?.status);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setSelectedStatus(order.status);
        }
    }, [open, order]);

    const handleUpdateStatus = async () => {
        if (!selectedStatus || selectedStatus === order?.status) {
            toast.error("Please select a new status");
        } else {
            setLoading(true);
            const response = await updateOrderStatus(order.id, { status: selectedStatus });
            if (response.success) {
                toast.success(response.message);
                setReload(!reload);
                setOpen(false);
            } else {
                toast.error(response.message);
            }
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[650px] px-1">
                <div className="flex flex-col gap-5 max-h-[600px] overflow-y-auto px-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex mt-6 items-center justify-between">
                            <p className="font-medium">Order ID</p>
                            <Label>{order?.id}</Label>
                        </div>
                        <div className="flex-between">
                            <p className="font-medium">Order Date</p>
                            <Label>{dayjsDate(order?.created_at)}</Label>
                        </div>
                        <div className="flex-between">
                            <p className="font-medium">Total Bill</p>
                            <Label>${order?.total_bill}</Label>
                        </div>
                        <div className="flex-between">
                            <p className="font-medium">Payment Method</p>
                            <Label>{paymentToString(order?.payment_method)}</Label>
                        </div>
                        <div className="flex-between">
                            <p className="font-medium">Order Status</p>
                            <Label>
                                <Badge className={`py-1 px-3 ${getStatusColor(order?.status)}`}>
                                    {order?.status.toUpperCase()}
                                </Badge>
                            </Label>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                        <div className="font-medium">Order Items</div>
                        <div className="flex flex-col gap-2">
                            {order?.items.length > 0 && order?.items.map((item, index) => (
                                <OrderItem key={index} item={item}/>
                            ))}
                        </div>
                        <div className="flex items-center justify-end gap-1">
                            <span className="font-bold text-xl mr-6">Total</span>
                            {order?.discount_bill && (
                                <span className="text-md text-muted-foreground line-through">${order?.total_bill}</span>
                            )}
                            <span className="font-bold text-xl">
                                ${order?.discount_bill || order?.total_bill}
                            </span>
                        </div>
                    </div>
                    <Separator/>
                    <div className="flex flex-col gap-2">
                        <div className="font-medium">Shipping Address</div>
                        <div className="flex flex-col gap-1 text-muted-foreground">
                            <span>User Name: {order?.first_name} {order?.last_name}</span>
                            <span>Email: {order?.email}</span>
                            <span>Street: {order?.street}</span>
                            <span>Ward: {order?.ward}</span>
                            <span>District: {order?.district}</span>
                            <span>City: {order?.city}</span>
                            <span>Country: {order?.country}</span>
                            <span>Phone: {order?.phone}</span>
                        </div>
                    </div>
                </div>
                <DialogFooter className="px-2">
                    <div className="flex flex-col w-full">
                        <Select
                            value={selectedStatus}
                            onValueChange={(status) => setSelectedStatus(status)}
                        >
                            <SelectTrigger className="w-full cursor-pointer">
                                <SelectValue placeholder="Update Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    {statusOptions.map((status) => (
                                        <SelectItem key={status.id} value={status.id} className="hover:bg-accent cursor-pointer">
                                            {status.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="flex items-center justify-end gap-2 mt-4">
                            <Button
                                className="cursor-pointer"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Close
                            </Button>
                            <Button
                                className="bg-primary text-white cursor-pointer"
                                onClick={handleUpdateStatus}
                                disabled={loading}
                            >
                                Update
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

AdminOrderDetail.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    reload: PropTypes.bool.isRequired,
    setReload: PropTypes.func.isRequired,
}

export default AdminOrderDetail;