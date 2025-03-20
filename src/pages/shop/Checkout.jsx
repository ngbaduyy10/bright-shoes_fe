import { useSelector } from 'react-redux';
import OrderItem from "@/components/OrderItem.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useUser} from "@clerk/clerk-react";
import {useEffect} from "react";
import {getAddress} from "@/services/address.service.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import SelectAddressDialog from "@/components/SelectAddressDialog.jsx";
import {createOrder} from "@/services/order.service.js";
import {toast} from "sonner";
import {useDispatch} from "react-redux";
import {clearCartSlice} from "@/store/cartSlice.js";

const Checkout = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems, totalPrice } = useSelector((state) => state.cart);
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // const fetchAddress = async () => {
        //     const response = await getAddress(user.id);
        //     if (response.success) {
        //         setAddressList(response.data);
        //     }
        // }
        //
        // if (user) {
        //     fetchAddress();
        // }
    }, [user]);

    const handleOrder = async () => {
        setLoading(true);
        const data = {
            userId: user.id,
            addressId: selectedAddress.id,
            items: cartItems,
            paymentMethod: "cod",
            totalPrice: totalPrice
        }

        const response = await createOrder(data);
        if (response.success) {
            await dispatch(clearCartSlice(user.id));
            navigate("/payment-success");
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        setLoading(false);
    }

    return (
        <>
            <div className="flex justify-center w-full px-2">
                <div className=" flex flex-col gap-8 w-[600px] my-10">
                    <div className="flex flex-col gap-2">
                        <div className="text-xl font-semibold">SHIPPING ADDRESS</div>
                        {addressList.length > 0 ? (
                            selectedAddress ? (
                                <div className="flex flex-col gap-1">
                                    <div className="text-lg">Street: {selectedAddress.street}</div>
                                    <div className="text-lg">City: {selectedAddress.city}</div>
                                    <div className="text-lg">State: {selectedAddress.state}</div>
                                    <div className="text-lg">Country: {selectedAddress.country}</div>
                                    <div className="text-lg">Zip Code: {selectedAddress.zip_code}</div>
                                    <div className="text-lg">Phone: {selectedAddress.phone_number}</div>
                                    <Button className="cursor-pointer" onClick={() => setDialogOpen(true)}>Change Address</Button>
                                </div>
                            ) : (
                                <>
                                    <div className="text-lg">Please select an address</div>
                                    <Button className="cursor-pointer" onClick={() => setDialogOpen(true)}>Select Address</Button>
                                </>
                            )
                        ) : (
                            <>
                                <div className="text-lg">No address found. Please create address</div>
                                <Button className="cursor-pointer" onClick={() => navigate("/account")}>Add Address</Button>
                            </>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 w-full">
                        <div className="text-xl font-semibold">ORDER TOTALS</div>
                        {cartItems.map((item) => (
                            <OrderItem key={item.shoes_id} item={item}/>
                        ))}
                        <div className="flex justify-end gap-4">
                            <span className="font-bold text-2xl">Total</span>
                            <span className="font-bold text-2xl">${totalPrice.toFixed(1)}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-lg">Payment Method</div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" className="h-[50px] cursor-pointer">Stripe</Button>
                                <Button variant="outline" className="h-[50px] cursor-pointer">Cash on Delivery</Button>
                            </div>
                        </div>
                        <Button className="w-full mt-2 cursor-pointer" onClick={handleOrder} disabled={loading}>
                            Place Order
                        </Button>
                    </div>
                </div>
            </div>

            <SelectAddressDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                addressList={addressList}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
            />
        </>
    )
}

export default Checkout;