import { Menu, ShoppingCart, House, ShoppingBag, Contact, MessageCirclePlus, LoaderCircle } from "lucide-react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.jsx";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from '@clerk/clerk-react';
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import CartSheet from "@/components/CartSheet.jsx";
import { useDispatch } from "react-redux";
import { getCartSlice } from "@/store/cartSlice";

const ShopNavbar = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cartOpen, setCartOpen] = useState(false);
    const { cartItems } = useSelector((state) => state.cart);
    const totalItems = cartItems.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

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

                    <div className="hidden md:flex items-center-start gap-5 mt-1">
                        <NavLink to="/" className="text-lg navbar-link text-foreground">
                            <p>HOME</p>
                            <hr className="w-1/2 border-foreground border hidden"/>
                        </NavLink>
                        <NavLink to="/collection" className="text-lg navbar-link text-foreground">
                            <p>COLLECTION</p>
                            <hr className="w-1/2 border-foreground border hidden"/>
                        </NavLink>
                        <NavLink to="/contact" className="text-lg font-medium navbar-link text-foreground">
                            <p>CONTACT</p>
                            <hr className="w-1/2 border-foreground border hidden"/>
                        </NavLink>
                        {isSignedIn && (
                            <NavLink to="/account" className="text-lg font-medium navbar-link text-foreground">
                                <p>ACCOUNT</p>
                                <hr className="w-1/2 border-foreground border hidden"/>
                            </NavLink>
                        )}
                    </div>

                    <div className="flex items-center gap-4 md:hidden">
                        <div className="relative" onClick={() => setCartOpen(true)}>
                            <ShoppingCart size={26} className="cursor-pointer" />
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
                                        <div className="m-4 flex items-center gap-2">
                                            <UserButton />
                                            {user.fullName}
                                        </div>
                                    ) : (
                                        <div className="mx-4 mt-6"></div>
                                    )}

                                    <div className="navbar-sheet" onClick={() => navigate("/")}>
                                        <House/>
                                        <Label className="text-lg font-medium cursor-pointer">Home</Label>
                                    </div>
                                    <div className="navbar-sheet" onClick={() => navigate("/collection")}>
                                        <ShoppingBag/>
                                        <Label className="text-lg font-medium cursor-pointer">Collection</Label>
                                    </div>
                                    <div className="navbar-sheet" onClick={() => navigate("/contact")}>
                                        <Contact/>
                                        <Label className="text-lg font-medium cursor-pointer">Contact</Label>
                                    </div>
                                    {isSignedIn && (
                                        <div className="navbar-sheet" onClick={() => navigate("/account")}>
                                            <MessageCirclePlus/>
                                            <Label className="text-lg font-medium cursor-pointer">Account</Label>
                                        </div>
                                    )}

                                    {!isSignedIn && (
                                        <Button className="mx-4 cursor-pointer" onClick={() => navigate("/login")}>Sign
                                            In</Button>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <div className="relative" onClick={() => setCartOpen(true)}>
                            <ShoppingCart size={26} className="cursor-pointer"/>
                            <span className="cart-quantity">
                                {totalItems}
                            </span>
                        </div>
                        {isLoaded ? (
                            <>
                                {isSignedIn ? (
                                    <UserButton afterSignOutUrl="/login" />
                                ) : (
                                    <Button className="cursor-pointer" onClick={() => navigate("/login")}>Sign In</Button>
                                )}
                            </>
                        ) : (
                            <div className="animate-spin">
                                <LoaderCircle />
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <CartSheet open={cartOpen} setOpen={setCartOpen}/>
        </>
    );
}

export default ShopNavbar;