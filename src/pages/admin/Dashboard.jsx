import RevenueBarChart from "@/components/RevenueBarChart.jsx";
import OrderStatusPieChart from "@/components/OrderStatusPieChart.jsx";
import CustomerLineChart from "@/components/CustomerLineChart.jsx";
import CategoryDoughnutChart from "@/components/CategoryDoughnutChart.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";
import {HandCoins, ShoppingCart, User, CreditCard} from "lucide-react";
import {useEffect, useState} from "react";
import {getAllOrders} from "@/services/order.service.js";
import {getShoes} from "@/services/shoes.service.js";
import {getCustomers} from "@/services/user.service.js";
import NumberCounter from "@/components/NumberCounter.jsx";

const Dashboard = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await getAllOrders();
            if (response.success) {
                const orders = response.data;
                setTotalRevenue(orders.reduce((acc, order) => {
                    if (order.status === "cancelled") {
                        return acc;
                    }
                    if (order.discount_bill) {
                        return acc + parseInt(order.discount_bill);
                    }
                    return acc + parseInt(order.total_bill);
                }, 0));
                setTotalOrders(orders.length);
            }
        }

        const fetchProducts = async () => {
            const response = await getShoes();
            if (response.success) {
                const products = response.data;
                setTotalProducts(products.length);
            }
        }

        const fetchCustomers = async () => {
            const response = await getCustomers();
            if (response.success) {
                const customers = response.data;
                setTotalCustomers(customers.length);
            }
        }

        fetchOrders();
        fetchProducts();
        fetchCustomers();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-4 gap-4">
                <Card className="bg-white rounded-[30px]">
                    <CardContent>
                        <div className="flex-between">
                            <h2 className="text-lg text-muted-foreground">Total Revenue</h2>
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-100/50">
                                <HandCoins className="text-teal-600 w-6 h-6"/>
                            </div>
                        </div>
                        <div className="text-3xl font-bold mt-2">
                            <NumberCounter amount={totalRevenue} prefix="$" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white rounded-[30px]">
                    <CardContent>
                        <div className="flex-between">
                            <h2 className="text-lg text-muted-foreground">Total Orders</h2>
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100/50">
                                <ShoppingCart className="text-blue-700 w-6 h-6" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold mt-2">
                            <NumberCounter amount={totalOrders} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white rounded-[30px]">
                    <CardContent>
                        <div className="flex-between">
                            <h2 className="text-lg text-muted-foreground">Total Customers</h2>
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100/50">
                                <User className="text-green-600 w-6 h-6" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold mt-2">
                            <NumberCounter amount={totalCustomers} />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white rounded-[30px]">
                    <CardContent>
                        <div className="flex-between">
                            <h2 className="text-lg text-muted-foreground">Total Products</h2>
                            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100/50">
                                <CreditCard className="text-yellow-700 w-6 h-6" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold mt-2">
                            <NumberCounter amount={totalProducts} />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-3 gap-4 flex items-center">
            <div className="col-span-2">
                    <RevenueBarChart />
                </div>
                <div className="col-span-1">
                    <OrderStatusPieChart/>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 flex items-center">
                <div className="col-span-1">
                    <CategoryDoughnutChart />
                </div>
                <div className="col-span-2">
                    <CustomerLineChart/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;