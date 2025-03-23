import { useParams, useNavigate } from "react-router-dom";
import StarRating from "@/components/StartRating.jsx";
import {Button} from "@/components/ui/button.jsx";
import {TooltipProvider, Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {toast} from "sonner";
import {addToCartSlice} from "@/store/cartSlice.js";
import {useUser} from "@clerk/clerk-react";
import {getShoeById} from "@/services/shoes.service.js";
import {Bookmark, BookmarkCheck} from "lucide-react";
import {addToWishlist, removeFromWishlist, wishlistCheck} from "@/services/wishlist.service.js";

const Detail = () => {
    const { shoesId } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.cart);
    const [item, setItem] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [wishlistItem, setWishlistItem] = useState(false);

    useEffect(() => {
        const fetchWishlistCheck = async () => {
            const response = await wishlistCheck({ userId: user.id, shoesId: shoesId });
            if (response.data) {
                setWishlistItem(response.data);
            }
        }
        if (user) {
            fetchWishlistCheck();
        }
    }, [user, shoesId]);

    useEffect(() => {
        const fetchShoes = async () => {
            const response = await getShoeById(shoesId);
            if (response.success) {
                setItem(response.data);
            }
        }
        window.scrollTo(0, 0);
        fetchShoes();
    }, [shoesId]);

    const handleAddToCart = async () => {
        if (!user) {
            toast.error(
                <div className="flex-between font-main">
                    <p>You need to be logged in to add items to cart.</p>
                    <Button onClick={() => navigate('/login')} className="cursor-pointer">Sign In</Button>
                </div>
            );
        } else {
            const response = await dispatch(addToCartSlice({ userId: user.id, shoesId: shoesId }));
            const payload = response.payload;
            if (payload.success) {
                toast.success(payload.message);
            } else {
                toast.error(payload.message);
            }
        }
    }

    const handleAddToWishlist = async () => {
        const response = await addToWishlist({ userId: user.id, shoesId: shoesId });
        if (response.success) {
            setWishlistItem(true);
            toast.success(
                <div className="flex items-center gap-8 font-main">
                    <p>{response.message}</p>
                    <Button
                        onClick={() => {
                            sessionStorage.setItem('activeTab', 'wishlist');
                            navigate('/account');
                        }}
                        className="cursor-pointer"
                    >
                        Wishlist
                    </Button>
                </div>
            );
        } else {
            toast.error(response.message);
        }
    }

    const handleRemoveFromWishlist = async () => {
        const response = await removeFromWishlist({userId: user.id, shoesId: shoesId});
        if (response.success) {
            setWishlistItem(false);
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 max-w-[90vw] md:max-w-[95vw] lg:max-w-[85vw] xl:max-w-[70vw]">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={item?.image_url}
                        alt={item?.name}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <div>
                        <div className="flex items-start justify-between">
                            <h1 className="text-2xl font-extrabold text-black">{item?.name}</h1>
                            {user && wishlistItem ? (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <BookmarkCheck size={30} className="cursor-pointer" onClick={handleRemoveFromWishlist} />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-primary">
                                            <p>Remove from Wishlist</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ) : (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Bookmark size={30} className="cursor-pointer" onClick={handleAddToWishlist} />
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-primary">
                                            <p>Add to Wishlist</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                        </div>
                        <p className="text-muted-foreground text-lg mb-5 mt-4 text-justify">
                            {item?.description}
                        </p>
                    </div>
                    <p className="text-3xl font-bold text-primary">
                        ${item?.price}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-0.5">
                            <StarRating rating={4.5}/>
                        </div>
                        <span className="text-muted-foreground">
                                4.5
                        </span>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-2 mt-2">
                        {item?.size.map((size) => (
                            <div
                                key={size}
                                className={`flex-center px-1 py-2 border border-muted-foreground rounded-lg cursor-pointer hover:bg-black hover:text-white 
                                    ${selectedSize === size ? "bg-black text-white" : ""}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                US {size}
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 mb-5">
                        {item?.quantity === 0 ? (
                            <Button className="w-full opacity-60 cursor-not-allowed">
                                Out of Stock
                            </Button>
                        ) : (
                            <Button
                                className="w-full bg-primary text-md text-white cursor-pointer"
                                disabled={loading}
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;