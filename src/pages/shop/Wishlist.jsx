import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card.jsx";
import {useEffect, useState} from "react";
import {getWishlistItems} from "@/services/wishlist.service.js";
import {useUser} from "@clerk/clerk-react";
import ItemCard from "@/components/ItemCard.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";

const Wishlist = () => {
    const { user } = useUser();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWishlistItems = async () => {
            setLoading(true);
            const response = await getWishlistItems(user.id);
            if (response.success) {
                setWishlistItems(response.data);
            }
            setLoading(false);
        }
        if (user) {
            fetchWishlistItems();
        }
    }, [user]);

    return (
        <Card className="min-h-[300px]">
            <CardHeader>
                <CardTitle className="text-2xl">Wishlist Items</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {Array(5).fill(0).map((_, index) => (
                            <div className="cursor-pointer rounded-lg" key={index}>
                                <div className="overflow-hidden rounded-lg">
                                    <Skeleton className="h-48 w-full"/>
                                </div>
                                <Skeleton className="h-4 w-3/4 mt-2"/>
                                <Skeleton className="h-4 w-1/4 mt-1"/>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {wishlistItems.length === 0 ? (
                            <div className="text-lg text-gray-500">No items in Wishlist</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {wishlistItems.map((item) => (
                                    <ItemCard key={item.id} item={item}/>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default Wishlist;