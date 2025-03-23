import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Address from './Address.jsx';
import Order from './Order.jsx';
import Wishlist from './Wishlist.jsx';
import { useEffect, useState } from 'react';

const Account = () => {
    const [activeTab, setActiveTab] = useState(sessionStorage.getItem('activeTab') || 'order');

    useEffect(() => {
        const storedTab = sessionStorage.getItem('activeTab');
        if (storedTab) {
            setActiveTab(storedTab);
        }
    }, []);

    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
        sessionStorage.setItem('activeTab', newTab);
    };

    return (
        <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <Tabs defaultValue={activeTab}>
                    <TabsList className="bg-primary">
                        <TabsTrigger
                            value="order"
                            className="cursor-pointer text-white w-[110px]"
                            onClick={() => handleTabChange('order')}
                        >
                            ORDER
                        </TabsTrigger>
                        <TabsTrigger
                            value="address"
                            className="cursor-pointer text-white w-[110px]"
                            onClick={() => handleTabChange('address')}
                        >
                            ADDRESS
                        </TabsTrigger>
                        <TabsTrigger
                            value="wishlist"
                            className="cursor-pointer text-white w-[110px]"
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
    )
}

export default Account;