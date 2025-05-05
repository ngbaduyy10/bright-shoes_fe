import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Address from './Address.jsx';
import Order from './Order.jsx';
import Wishlist from './Wishlist.jsx';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import {Button} from "@/components/ui/button.jsx";
import { useNavigate } from 'react-router-dom';
import {motion} from "framer-motion";


const Account = () => {
    const [activeTab, setActiveTab] = useState(sessionStorage.getItem('activeTab') || 'order');
    const { isSignedIn } = useUser();
    const navigate = useNavigate();

    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
        sessionStorage.setItem('activeTab', newTab);
    };

    return (
        <>
            {isSignedIn ? (
                <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
                    <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                        <Tabs defaultValue={activeTab}>
                            <TabsList className="bg-primary h-10">
                                <TabsTrigger
                                    value="order"
                                    className="cursor-pointer text-white h-8 w-[120px]"
                                    onClick={() => handleTabChange('order')}
                                >
                                    ORDER
                                </TabsTrigger>
                                <TabsTrigger
                                    value="address"
                                    className="cursor-pointer text-white h-8 w-[120px]"
                                    onClick={() => handleTabChange('address')}
                                >
                                    ADDRESS
                                </TabsTrigger>
                                <TabsTrigger
                                    value="wishlist"
                                    className="cursor-pointer text-white h-8 w-[120px]"
                                    onClick={() => handleTabChange('wishlist')}
                                >
                                    WISHLIST
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="order">
                                <Order />
                            </TabsContent>
                            <TabsContent value="address">
                                <Address />
                            </TabsContent>
                            <TabsContent value="wishlist">
                                <Wishlist />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            ) : (
                <div className="flex-center flex-col gap-4 flex-1">
                    <div className="text-3xl font-bold">Please sign in to view your account!</div>
                    <Button asChild className="cursor-pointer w-[200px]">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/login")}
                        >
                            Sign In
                        </motion.div>
                    </Button>
                </div>
            )}
        </>
    )
}

export default Account;