import { useParams, useNavigate } from "react-router-dom";
import StarRating from "@/components/StartRating.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";
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
            console.log(response);
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
                            {isSignedIn && wishlistItem ? (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Bookmark
                                                size={30}
                                                className="cursor-pointer fill-black text-black"
                                                onClick={handleRemoveFromWishlist}
                                            />
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
                                            <Bookmark
                                                size={30}
                                                className="cursor-pointer"
                                                onClick={handleAddToWishlist}
                                            />
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
                            <StarRating rating={avgRating} />
                        </div>
                        <span className="text-muted-foreground">
                            {avgRating?.toFixed(1) || 0} ({reviews.length} reviews)
                        </span>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 mt-2">
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
                                {loading ? (
                                    <div className="animate-spin flex-center">
                                        <LoaderCircle/>
                                    </div>
                                ) : "Add to Cart"}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <Separator className="max-w-[90vw] md:max-w-[95vw] lg:max-w-[85vw] xl:max-w-[70vw]"/>
            <div className="flex flex-col py-12 w-full max-w-[90vw] md:max-w-[95vw] lg:max-w-[85vw] xl:max-w-[70vw]">
                <h2 className="text-2xl font-extrabold text-black mb-4">Reviews</h2>
                <div className="flex flex-col gap-6">
                    {reviewLoading ? (
                        <div className="animate-spin flex-center">
                            <LoaderCircle/>
                        </div>
                    ) : (
                        <>
                            {reviews.length > 0 ? (
                                reviews.map((reviewItem, index) => (
                                    <div className="flex gap-2" key={index}>
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
                                                <AvatarFallback className="font-extrabold text-xl bg-primary text-white">
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
                                                <StarIcon size={16} className="fill-yellow-500 text-yellow-500" />
                                                {reviewItem?.rating}
                                            </div>
                                            <p className="text-muted-foreground text-lg">
                                                {reviewItem.comment}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-lg text-gray-500">No Reviews. Be the first to review this product.</div>
                            )}
                        </>
                    )}
                </div>
                {isSignedIn && isBought && (
                    <div className="mt-10 flex-col flex gap-2">
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
                        <Button className="cursor-pointer" onClick={handleSubmitReview}>
                            Submit
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Detail;