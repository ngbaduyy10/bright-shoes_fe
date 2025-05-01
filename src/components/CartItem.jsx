import PropTypes from "prop-types";
import { Trash, Minus, Plus } from "lucide-react";
import {useUser} from "@clerk/clerk-react";
import {useDispatch} from "react-redux";
import {deleteCartItemSlice, updateCartItemSlice} from "@/store/cartSlice";
import {toast} from "sonner";
import {useState} from "react";
import { motion, AnimatePresence } from "framer-motion";

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
                src={item.image_url}
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
                        <motion.button
                            whileTap={{scale: 0.9}}
                            whileHover={{scale: 1.05}}
                            transition={{type: "spring", stiffness: 300, damping: 20}}
                            disabled={item?.quantity === 1 || loading}
                            onClick={() => updateItemQuantity(item.quantity - 1)}
                            className="h-8 w-8 rounded-full border cursor-pointer flex items-center justify-center"
                        >
                            <Minus className="w-4 h-4"/>
                        </motion.button>

                        <div className="relative w-6 h-6 flex items-center justify-center">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={item?.quantity}
                                    initial={{opacity: 0, y: -10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: 10}}
                                    transition={{duration: 0.2}}
                                    className="absolute font-semibold"
                                >
                                    {item?.quantity}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        <motion.button
                            whileTap={{scale: 0.9}}
                            whileHover={{scale: 1.05}}
                            transition={{type: "spring", stiffness: 300, damping: 20}}
                            disabled={loading}
                            onClick={() => updateItemQuantity(item.quantity + 1)}
                            className="h-8 w-8 rounded-full border cursor-pointer flex items-center justify-center"
                        >
                            <Plus className="w-4 h-4"/>
                        </motion.button>
                    </div>
                    <motion.div
                        whileHover={{scale: 1.2, rotate: -10}}
                        whileTap={{scale: 0.9, rotate: 0}}
                        transition={{type: "spring", stiffness: 300, damping: 15}}
                        className="cursor-pointer mt-1"
                        onClick={handleDeleteItem}
                        disabled={loading}
                    >
                        <Trash size={20}/>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.object,
}

export default CartItem;