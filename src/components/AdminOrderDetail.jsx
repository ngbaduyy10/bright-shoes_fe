import {Dialog, DialogContent} from "@/components/ui/dialog.jsx";
import {Label} from "@/components/ui/label.jsx";
import {dayjsDate} from "@/utils/dayjsConfig.js";
import {getStatusColor, paymentToString} from "@/utils/index.js";
import {Badge} from "@/components/ui/badge.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import OrderItem from "@/components/OrderItem.jsx";
import PropTypes from "prop-types";

const AdminOrderDetail = ({ open, setOpen, order }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <div className="flex flex-col gap-5">
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
                        <div className="flex justify-end gap-2">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-lg">${order?.total_bill}</span>
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
            </DialogContent>
        </Dialog>
    );
}

AdminOrderDetail.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
}

export default AdminOrderDetail;