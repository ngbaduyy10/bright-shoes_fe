import { useParams, useNavigate } from "react-router-dom";
import StarRating from "@/components/StartRating.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import {TooltipProvider, Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {toast} from "sonner";
import {addToCartSlice} from "@/store/cartSlice.js";
import {useUser} from "@clerk/clerk-react";
import {getShoeById} from "@/services/shoes.service.js";
import {getReviews, addReview} from "@/services/review.service.js";
import {orderCheck} from "@/services/order.service.js";
import {Bookmark, LoaderCircle, StarIcon} from "lucide-react";
import {addToWishlist, removeFromWishlist, wishlistCheck} from "@/services/wishlist.service.js";
import {dayjsDay} from "@/utils/dayjsConfig.js";
import {motion} from "framer-motion";

const Detail = () => {
    const { shoesId } = useParams();
    const { user, isSignedIn } = useUser();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.cart);
    const [item, setItem] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [wishlistItem, setWishlistItem] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewMsg, setReviewMsg] = useState("");
    const [avgRating, setAvgRating] = useState(0);
    const [rating, setRating] = useState(0);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [reviewReload, setReviewReload] = useState(false);
    const [isBought, setIsBought] = useState(false);
    const [shoesLoading, setShoesLoading] = useState(false);

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
            setShoesLoading(true);
            const response = await getShoeById(shoesId);
            if (response.success) {
                setItem(response.data);
            }
            setShoesLoading(false);
        }
        window.scrollTo(0, 0);
        fetchShoes();
    }, [shoesId]);

    useEffect(() => {
        const fetchReviews = async () => {
            setReviewLoading(true);
            const response = await getReviews(shoesId);
            if (response.success) {
                setReviews(response.data.reviews);
                setAvgRating(response.data.averageRating);
            }
            setReviewLoading(false);
        }
        fetchReviews();
    }, [shoesId, reviewReload]);

    useEffect(() => {
        const fetchOrderCheck = async () => {
            const response = await orderCheck({ userId: user.id, shoesId: shoesId });
            if (response.success) {
                if (response.data && response.data.length > 0) {
                    setIsBought(true);
                }
            }
        }
        if (user) {
            fetchOrderCheck();
        }
    }, [shoesId, user]);

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

    const handleSubmitReview = async () => {
        if (reviewMsg.trim() === "") {
            toast.error("Please write a review.");
        } else if (rating === 0) {
            toast.error("Please rate the product.");
        } else {
            const response = await addReview({
                userId: user.id,
                shoesId: shoesId,
                rating: rating,
                comment: reviewMsg
            });
            if (response.success) {
                toast.success(response.message);
                setRating(0);
                setReviewMsg("");
                setReviewReload(!reviewReload);
            } else {
                toast.error(response.message);
            }
        }
    }

    return (
        <div className="flex flex-col items-center">
            {shoesLoading ? (
                <div className="flex flex-col lg:flex-row gap-8 py-12 container px-2 w-full">
                    <div className="overflow-hidden rounded-lg w-full xl:w-2/5">
                        <Skeleton className="aspect-square w-full" />
                    </div>
                    <div className="flex flex-col w-full xl:w-3/5">
                        <div>
                            <div className="flex items-start justify-between">
                                <Skeleton className="h-8 w-2/3" />
                                <Skeleton className="h-8 w-8 rounded-md" />
                            </div>
                            <Skeleton className="h-20 w-full mt-4 mb-5" />
                        </div>
                        <Skeleton className="h-10 w-32 mb-3" />
                        <div className="flex items-center gap-2 mt-2">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-5 xl:grid-cols-7 gap-2 mt-2">
                            {Array.from({ length: 7 }).map((_, index) => (
                                <Skeleton key={index} className="h-10 w-full" />
                            ))}
                        </div>
                        <div className="mt-5 mb-5">
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8 py-12 container px-2">
                    <motion.div
                        className="overflow-hidden rounded-lg w-full xl:w-2/5"
                        initial={{scale: 0.95, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{duration: 0.5, delay: 0.2}}
                    >
                        <img
                            src={item?.image_url}
                            alt={item?.name}
                            width={600}
                            height={600}
                            className="aspect-square w-full object-cover"
                        />
                    </motion.div>
                    <motion.div
                        className="flex flex-col w-full xl:w-3/5"
                        initial={{x: 30, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{duration: 0.6, delay: 0.3}}
                    >
                        <div>
                            <div className="flex items-start justify-between">
                                <h1 className="text-2xl font-extrabold text-black">{item?.name}</h1>
                                {isSignedIn && wishlistItem ? (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <motion.div
                                                    whileHover={{
                                                        scale: 1.1,
                                                        rotate: 10,
                                                    }}
                                                    whileTap={{scale: 0.95}}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 20,
                                                    }}
                                                    className="cursor-pointer"
                                                >
                                                    <Bookmark
                                                        size={30}
                                                        className="cursor-pointer fill-black text-black"
                                                        onClick={handleRemoveFromWishlist}
                                                    />
                                                </motion.div>
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
                                                <motion.div
                                                    whileHover={{
                                                        scale: 1.1,
                                                        rotate: 10,
                                                    }}
                                                    whileTap={{scale: 0.95}}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 20,
                                                    }}
                                                    className="cursor-pointer"
                                                >
                                                    <Bookmark
                                                        size={30}
                                                        className="cursor-pointer"
                                                        onClick={handleAddToWishlist}
                                                    />
                                                </motion.div>
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
                                <StarRating rating={avgRating || 0}/>
                            </div>
                            <span className="text-muted-foreground">
                            {avgRating?.toFixed(1) || 0} ({reviews.length} reviews)
                        </span>
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-5 xl:grid-cols-7 gap-2 mt-2">
                            {item?.size.map((size) => (
                                <motion.div
                                    key={size}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className={`flex-center px-1 py-2 border border-muted-foreground rounded-lg cursor-pointer hover:bg-black hover:text-white 
                                    ${selectedSize === size ? "bg-black text-white" : ""}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    US {size}
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-5 mb-5">
                            {item?.quantity === 0 ? (
                                <Button className="w-full opacity-60 cursor-not-allowed">
                                    Out of Stock
                                </Button>
                            ) : (
                                <motion.button
                                    className={`w-full bg-primary text-md text-white cursor-pointer rounded-lg ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                                    disabled={loading}
                                    onClick={handleAddToCart}
                                    whileHover={{scale: 1.01}}
                                    whileTap={{scale: 0.97}}
                                    transition={{type: "spring", stiffness: 250, damping: 20}}
                                >
                                    <Button disabled={loading} className="w-full cursor-pointer">
                                        {loading ? (
                                            <div className="animate-spin flex-center">
                                                <LoaderCircle/>
                                            </div>
                                        ) : (
                                            "Add to Cart"
                                        )}
                                    </Button>
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
            <Separator className="container px-2"/>
            <div className="flex flex-col py-12 w-full container px-2">
                <h2 className="text-2xl font-extrabold text-black mb-4">Reviews</h2>
                <div className="flex flex-col gap-6">
                    {reviewLoading ? (
                        Array.from({length: 2 }).map((_, i) => (
                            <div className="flex gap-2 mb-6" key={i}>
                                <Skeleton className="w-10 h-10 rounded-full" />
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-5 w-1/4" />
                                        <Skeleton className="h-4 w-1/6" />
                                    </div>
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-5 w-full" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <>
                            {reviews.length > 0 ? (
                                reviews.map((reviewItem, index) => (
                                    <motion.div
                                        className="flex gap-2"
                                        key={index}
                                        initial={{opacity: 0, y: 20}}
                                        whileInView={{opacity: 1, y: 0}}
                                        viewport={{once: true}}
                                        transition={{duration: 0.4, delay: index * 0.1}}
                                    >
                                        {reviewItem.image_url ? (
                                            <div className="w-10 h-10">
                                                <img
                                                    src={reviewItem.image_url}
                                                    alt={reviewItem.first_name}
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            </div>
                                        ) : (
                                            <Avatar className="w-10 h-10">
                                                <AvatarFallback
                                                    className="font-extrabold text-xl bg-primary text-white">
                                                    {`${reviewItem?.first_name?.charAt(0)}`}
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <div className="font-bold text-lg leading-6">
                                                    {`${reviewItem?.first_name} ${reviewItem?.last_name}`}
                                                </div>
                                                <div className="text-muted-foreground text-md">
                                                    {dayjsDay(reviewItem?.created_at)}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 leading-none">
                                                <StarIcon size={16} className="fill-yellow-500 text-yellow-500"/>
                                                {reviewItem?.rating}
                                            </div>
                                            <p className="text-muted-foreground text-lg">
                                                {reviewItem.comment}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-lg text-gray-500">No Reviews. Be the first to review this
                                    product.</div>
                            )}
                        </>
                    )}
                </div>
                {isSignedIn && isBought && (
                    <motion.div
                        className="mt-10 flex-col flex gap-2"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        viewport={{once: true}}
                        transition={{duration: 0.5, delay: 0.2}}
                    >
                        <Label className="text-lg">Write a review</Label>
                        <div className="flex items-center gap-0.5">
                            <StarRating rating={rating} handleRatingChange={(value) => setRating(value)}/>
                        </div>
                        <Input
                            name="reviewMsg"
                            value={reviewMsg}
                            onChange={(event) => setReviewMsg(event.target.value)}
                            placeholder="Write a review..."
                            className="h-[50px] md:text-md"
                        />
                        <motion.button
                            whileHover={{scale: 1.01}}
                            whileTap={{scale: 0.97}}
                            transition={{type: "spring", stiffness: 250, damping: 20}}
                            className="w-full"
                            disabled={reviewLoading}
                        >
                            <Button
                                className="cursor-pointer w-full"
                                disabled={reviewLoading}
                                onClick={handleSubmitReview}
                            >
                                {reviewLoading ? (
                                    <div className="animate-spin flex-center">
                                        <LoaderCircle/>
                                    </div>
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default Detail;