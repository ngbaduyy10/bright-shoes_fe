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
import {LoaderCircle, Check, ChevronsUpDown} from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {getDiscountByOrderValue} from "@/services/discount.service.js";
import {Card, CardContent} from "@/components/ui/card.jsx";
import dayjs from "dayjs";
import {convertDate} from "@/utils/dayjsConfig.js";
import stripe_logo from "@/assets/stripe_logo.png";

const Checkout = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems, totalPrice } = useSelector((state) => state.cart);
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedVoucherId, setSelectedVoucherId] = useState(null);
    const [discountList, setDiscountList] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [discountPrice, setDiscountPrice] = useState(null);
    const [method, setMethod] = useState('cod');

    useEffect(() => {
        const fetchAddress = async () => {
            const response = await getAddress(user.id);
            if (response.success) {
                setAddressList(response.data);
            }
        }

        if (user) {
            fetchAddress();
        }
    }, [user]);

    useEffect(() => {
        const fetchDiscount = async () => {
            const response = await getDiscountByOrderValue({orderValue: totalPrice});
            if (response.success) {
                setDiscountList(response.data);
            }
        }

        fetchDiscount();
    }, [totalPrice]);

    const handleOrder = async () => {
        setLoading(true);
        let data = {
            userId: user.id,
            address: selectedAddress,
            items: cartItems,
            paymentMethod: method,
            totalBill: totalPrice,
            discountBill: discountPrice,
        }

        if (!selectedAddress) {
            toast.error("Please select an address");
            setLoading(false);
            return;
        }

        if (method === 'cod') {
            const response = await createOrder(data);
            if (response.success) {
                await dispatch(clearCartSlice(user.id));
                navigate("/payment-success");
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } else if (method === 'stripe') {
            console.log(data);
        }
        setLoading(false);
    }

    const handleSelectDiscount = (currentValue, discount) => {
        if (currentValue !== selectedVoucherId) {
            setSelectedVoucherId(currentValue);
            setSelectedDiscount(discount);
            const discountAmount = discount?.discount_type === "percent" ? (totalPrice * (100 - discount.percentage_value)) / 100 : (totalPrice - discount.amount_value);
            setDiscountPrice(discountAmount);
        } else {
            setSelectedVoucherId(null);
            setSelectedDiscount(null);
            setDiscountPrice(null);
        }
        setOpen(false);
    }

    return (
        <>
            <div className="flex justify-center w-full px-2 my-10">
                <div className=" flex flex-col md:flex-row gap-10 container">
                    <div className="flex flex-col gap-4 md:w-2/3">
                        <div className="text-2xl font-semibold">ORDER TOTALS</div>
                        {cartItems.map((item) => (
                            <OrderItem key={item.shoes_id} item={item}/>
                        ))}
                        <div className="flex items-center justify-end gap-2">
                            <span className="font-bold text-2xl mr-6">Total</span>
                            {discountPrice && (
                                <span className="text-xl text-muted-foreground line-through">${totalPrice.toFixed(1)}</span>
                            )}
                            <span className="font-bold text-2xl">${discountPrice?.toFixed(1) || totalPrice.toFixed(1)}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                        <div className="text-xl font-semibold">Payment Method</div>
                            <div className="flex items-center gap-2">
                                <div onClick={() => setMethod('stripe')}
                                     className="flex items-center gap-3 border py-4 px-3 cursor-pointer rounded-lg">
                                    <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                                    <img className="h-5 mx-4" src={stripe_logo} alt=""/>
                                </div>

                                <div onClick={() => setMethod('cod')}
                                     className="flex items-center gap-3 border py-4 px-3 cursor-pointer rounded-lg">
                                    <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                                    <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                                </div>
                            </div>
                        </div>
                        <Button className="w-full mt-2 cursor-pointer" onClick={handleOrder} disabled={loading}>
                            {loading ? (
                                <div className="animate-spin">
                                    <LoaderCircle/>
                                </div>
                            ) : "Place Order"}
                        </Button>
                    </div>

                    <div className="flex flex-col gap-4 md:w-1/3">
                        <div className="flex flex-col gap-2 p-5 rounded-xl shadow-md">
                            <div className="text-xl font-semibold">SHIPPING ADDRESS</div>
                            {addressList.length > 0 ? (
                                selectedAddress ? (
                                    <div className="flex flex-col">
                                        <div className="text-md"><b>Street:</b> {selectedAddress.street}</div>
                                        <div className="flex items-center gap-6">
                                            <div className="flex flex-col">
                                                <div className="text-md"><b>Ward:</b> {selectedAddress.ward}</div>
                                                <div className="text-md"><b>City:</b> {selectedAddress.city}</div>
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="text-md"><b>District:</b> {selectedAddress.district}</div>
                                                <div className="text-md"><b>Country:</b> {selectedAddress.country}</div>
                                            </div>
                                        </div>
                                        <div className="text-md"><b>Phone:</b> {selectedAddress.phone}</div>
                                        <Button className="cursor-pointer bg-white text-primary hover:text-white border mt-1" onClick={() => setDialogOpen(true)}>Change
                                            Address</Button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-lg text-gray-500">Please select an address</div>
                                        <Button className="cursor-pointer bg-white text-primary hover:text-white border" onClick={() => setDialogOpen(true)}>Select
                                            Address</Button>
                                    </>
                                )
                            ) : (
                                <>
                                    <div className="text-lg text-gray-500">No address found. Please create address</div>
                                    <Button
                                        className="cursor-pointer bg-white text-primary hover:text-white border"
                                        onClick={() => {
                                            sessionStorage.setItem("activeTab", "address");
                                            navigate("/account")
                                        }}
                                    >
                                        Add Address
                                    </Button>
                                </>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 p-5 rounded-xl shadow-md">
                            <div className="text-xl font-semibold">DISCOUNT VOUCHER</div>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full justify-between cursor-pointer bg-white"
                                    >
                                        {selectedVoucherId
                                            ? discountList.find((discount) => discount.id.toString() === selectedVoucherId)?.name
                                            : "Select discount voucher..."}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[360px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search voucher..." className="h-10" />
                                        <CommandList>
                                            <CommandEmpty>No voucher found.</CommandEmpty>
                                            <CommandGroup>
                                                {discountList.map((discount) => (
                                                    <CommandItem
                                                        key={discount.id.toString()}
                                                        value={discount.id.toString()}
                                                        onSelect={(currentValue) => handleSelectDiscount(currentValue, discount)}
                                                    >
                                                        <div className="flex-between gap-8 w-full cursor-pointer">
                                                            <div className="flex flex-col">
                                                                {discount.name}
                                                                <span className="text-sm text-muted-foreground">
                                                                    {discount.description}
                                                                </span>
                                                            </div>
                                                            <Check className={`${selectedVoucherId === discount.id.toString() ? "opacity-100" : "opacity-0"}`}/>
                                                        </div>
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            {selectedDiscount && (
                                <div className="p-3 bg-green-100/30 rounded-xl">
                                    <Card className="w-full overflow-hidden rounded-xl shadow-lg py-4">
                                        <CardContent className="px-2-0 flex justify-between items-center">
                                            <div className="space-y-1">
                                                <h3 className="text-2xl font-bold">{selectedDiscount.name}</h3>
                                                <p className="text-sm text-foreground">{selectedDiscount.description}</p>
                                                <p className="text-xs text-foreground mt-1 mb-0">
                                                    Minimum order value: ${selectedDiscount.min_order_value}
                                                </p>
                                                <p className="text-xs text-foreground">
                                                    Use by {convertDate(dayjs(selectedDiscount.end_date).format("DD/MM/YYYY"))}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}
                        </div>
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