import PropTypes from "prop-types";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet.jsx';
import {useEffect} from "react";
import {getCartSlice} from "@/store/cartSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useUser} from "@clerk/clerk-react";
import CartItem from "@/components/CartItem.jsx";
import { Button } from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CartSheet = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useUser();
    const { cartItems, totalPrice } = useSelector((state) => state.cart);

    useEffect(() => {
        if (user) {
            dispatch(getCartSlice(user.id));
        }
    }, [user, dispatch]);

    return (
        <Sheet open={open} onOpenChange={() => setOpen(false)}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-xl">Your cart</SheetTitle>
                </SheetHeader>
                {cartItems && cartItems.length > 0 ? (
                    <div className="mx-3">
                        <div className="space-y-4">
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item.shoes_id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <CartItem item={item} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <div className="mt-8 space-y-4">
                            <div className="flex justify-between">
                                <span className="font-bold text-xl">Total</span>
                                <span className="font-bold text-xl">${totalPrice.toFixed(1)}</span>
                            </div>
                        </div>
                        <Button asChild className="w-full mt-2 cursor-pointer">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                                onClick={() => {
                                    setOpen(false);
                                    navigate('/checkout');
                                }}
                            >
                                Checkout
                            </motion.button>
                        </Button>
                    </div>
                ) : (
                    <div className="flex-center">
                        <p className="text-lg font-semibold">Your cart is empty</p>
                    </div>
                )}

            </SheetContent>
        </Sheet>
    )
}

CartSheet.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}

export default CartSheet;