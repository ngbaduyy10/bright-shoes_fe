import { Menu, ShoppingCart, House, ShoppingBag, Contact, MessageCirclePlus } from "lucide-react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.jsx";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from '@clerk/clerk-react';
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import CartSheet from "@/components/CartSheet.jsx";
import { useDispatch } from "react-redux";
import { getCartSlice } from "@/store/cartSlice";
import { motion } from "framer-motion";

const ShopNavbar = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cartOpen, setCartOpen] = useState(false);
    const { cartItems } = useSelector((state) => state.cart);
    const totalItems = cartItems?.reduce((total, item) => {
        return total + item.quantity;
    }, 0) || 0;

    useEffect(() => {
        if (user) {
            dispatch(getCartSlice(user.id));
        }
    }, [user, dispatch]);

    return (
        <>
            <header className="navbar-header">
                <div className="flex items-start justify-between px-4 py-5">
                    <Link to="/home" className="text-4xl font-extrabold">
                        Bright
                    </Link>

                    <div className="hidden md:flex items-center-start gap-6 mt-1">
                        {[
                            {to: "/", label: "HOME"},
                            {to: "/collection", label: "COLLECTION"},
                            {to: "/contact", label: "CONTACT"},
                            {to: "/account", label: "ACCOUNT"}
                        ]
                            .filter(Boolean)
                            .map(({to, label}) => (
                                <NavLink
                                    key={label}
                                    to={to}
                                    className="text-lg font-medium navbar-link text-foreground"
                                >
                                    {({isActive}) => (
                                        <motion.div
                                            className="flex flex-col items-center"
                                            initial="rest"
                                            whileHover="hover"
                                            whileTap={{scale: 0.98}}
                                            animate={isActive ? "active" : "rest"}
                                            variants={{
                                                rest: {},
                                                hover: {
                                                    scale: 1.03,
                                                    transition: {duration: 0.3}
                                                },
                                                active: {}
                                            }}
                                        >
                                            <p>{label}</p>
                                            <motion.hr
                                                variants={{
                                                    rest: {scaleX: 0, opacity: 0},
                                                    hover: {scaleX: 1, opacity: 1},
                                                    active: {scaleX: 1, opacity: 1}
                                                }}
                                                transition={{duration: 0.3}}
                                                className="origin-center w-1/2 border border-foreground mt-1"
                                            />
                                        </motion.div>
                                    )}
                                </NavLink>
                            ))}
                    </div>

                    <div className="flex items-center gap-4 md:hidden">
                        <div className="relative" onClick={() => setCartOpen(true)}>
                            <ShoppingCart size={26} className="cursor-pointer"/>
                            <span className="cart-quantity">
                                {totalItems}
                            </span>
                        </div>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu size={32}/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[250px]">
                                <div className="flex flex-col gap-1">
                                    {isSignedIn ? (
                                        <div className="m-4 flex items-center gap-2 font-bold text-lg">
                                            <UserButton afterSignOutUrl="/login"/>
                                            {user.fullName}
                                        </div>
                                    ) : (
                                        <div className="mx-4 mt-6"></div>
                                    )}

                                    <div className="navbar-sheet cursor-pointer" onClick={() => navigate("/")}>
                                        <House/>
                                        <Label className="text-lg font-medium cursor-pointer">Home</Label>
                                    </div>
                                    <div className="navbar-sheet cursor-pointer"
                                         onClick={() => navigate("/collection")}>
                                        <ShoppingBag/>
                                        <Label className="text-lg font-medium cursor-pointer">Collection</Label>
                                    </div>
                                    <div className="navbar-sheet cursor-pointer" onClick={() => navigate("/contact")}>
                                        <Contact/>
                                        <Label className="text-lg font-medium cursor-pointer">Contact</Label>
                                    </div>
                                    <div className="navbar-sheet cursor-pointer"
                                         onClick={() => navigate("/account")}>
                                        <MessageCirclePlus/>
                                        <Label className="text-lg font-medium cursor-pointer">Account</Label>
                                    </div>

                                    {!isSignedIn && (
                                        <Button className="mx-4 cursor-pointer" onClick={() => navigate("/login")}>Sign
                                            In</Button>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="hidden md:flex items-center gap-4">

                        <motion.div
                            className="relative cursor-pointer"
                            onClick={() => setCartOpen(true)}
                            whileHover={{scale: 1.1, rotate: -5}}
                            whileTap={{scale: 0.95}}
                            transition={{type: "spring", stiffness: 300, damping: 15}}
                        >
                            <ShoppingCart size={26} className="cursor-pointer"/>
                            <span className="cart-quantity">
                                {totalItems}
                            </span>
                        </motion.div>
                        {isLoaded ? (
                            <motion.div
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                                transition={{type: "spring", stiffness: 250, damping: 20}}
                            >
                                {isSignedIn ? (
                                    <UserButton afterSignOutUrl="/login"/>
                                ) : (
                                    <Button className="cursor-pointer" onClick={() => navigate("/login")}>Sign
                                        In</Button>
                                )}
                            </motion.div>
                        ) : (
                            <Skeleton className="w-[2.6rem] h-[2.6rem] rounded-full"/>
                        )}
                    </div>
                </div>
            </header>
            <CartSheet open={cartOpen} setOpen={setCartOpen}/>
        </>
    );
}

export default ShopNavbar;