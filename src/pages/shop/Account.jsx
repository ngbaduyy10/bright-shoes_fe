import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Address from './Address.jsx';
import Order from './Order.jsx';
import Wishlist from './Wishlist.jsx';

const Account = () => {
    return (
        <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                <Tabs defaultValue="order">
                    <TabsList className="bg-primary">
                        <TabsTrigger value="order" className="cursor-pointer text-white">ORDER</TabsTrigger>
                        <TabsTrigger value="address" className="cursor-pointer text-white">ADDRESS</TabsTrigger>
                        <TabsTrigger value="wishlist" className="cursor-pointer text-white">WISHLIST</TabsTrigger>
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