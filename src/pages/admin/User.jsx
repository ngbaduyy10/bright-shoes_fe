import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import Admin from "@/pages/admin/Admin.jsx";
import Customer from "@/pages/admin/Customer.jsx";

const User = () => {
    return (
        <Tabs defaultValue="admin">
            <TabsList className="bg-primary">
                <TabsTrigger
                    value="admin"
                    className="cursor-pointer text-white w-[110px]"
                >
                    ADMIN
                </TabsTrigger>
                <TabsTrigger
                    value="customer"
                    className="cursor-pointer text-white w-[110px]"
                >
                    CUSTOMER
                </TabsTrigger>
            </TabsList>
            <TabsContent value="admin">
                <Admin />
            </TabsContent>
            <TabsContent value="customer">
                <Customer />
            </TabsContent>
        </Tabs>
    );
}

export default User;