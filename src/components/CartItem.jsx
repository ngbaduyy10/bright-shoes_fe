import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Trash, Minus, Plus } from "lucide-react";
import {useUser} from "@clerk/clerk-react";
import {useDispatch} from "react-redux";
import {deleteCartItemSlice, updateCartItemSlice} from "@/store/cartSlice";
import {toast} from "sonner";
import {useState} from "react";

const CartItem = ({ item }) => {
    const { user } = useUser();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const updateItemQuantity = async (quantity) => {
        setLoading(true);
        const response = await dispatch(updateCartItemSlice({ userId: user.id, shoesId: item.shoes_id, quantity }));
        const payload = response.payload;
        if (!payload.success) {
            toast.error(payload.message);
        }
        setLoading(false);
    }

    const handleDeleteItem = async () => {
        setLoading(true);
        await dispatch(deleteCartItemSlice({ userId: user.id, shoesId: item.shoes_id }));
        setLoading(false);
    }

    return (
        <div className="flex space-x-4">
            <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded object-cover"
            />
            <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold leading-none">{item.name}</h3>
                    <p className="font-semibold">
                        ${((item.salePrice > 0 ? item.salePrice : item.price) * item?.quantity).toFixed(1)}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 mt-1">
                        <Button
                            variant="outline"
                            className="h-8 w-8 rounded-full cursor-pointer"
                            size="icon"
                            disabled={item?.quantity === 1 || loading}
                            onClick={() => updateItemQuantity(item.quantity - 1)}
                        >
                            <Minus className="w-4 h-4"/>
                        </Button>
                        <span className="font-semibold">{item?.quantity}</span>
                        <Button
                            variant="outline"
                            className="h-8 w-8 rounded-full cursor-pointer"
                            size="icon"
                            onClick={() => updateItemQuantity(item.quantity + 1)}
                            disabled={loading}
                        >
                            <Plus className="w-4 h-4"/>
                        </Button>
                    </div>
                    <Trash
                        className="cursor-pointer mt-1"
                        size={20}
                        onClick={handleDeleteItem}
                    />
                </div>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.object,
}

export default CartItem;