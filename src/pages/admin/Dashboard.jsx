import RevenueBarChart from "@/components/RevenueBarChart.jsx";
import OrderStatusPieChart from "@/components/OrderStatusPieChart.jsx";
import CustomerLineChart from "@/components/CustomerLineChart.jsx";
import CategoryDoughnutChart from "@/components/CategoryDoughnutChart.jsx";
import {Card, CardContent} from "@/components/ui/card.jsx";
import {HandCoins, ShoppingCart, User, CreditCard} from "lucide-react";
import {useEffect, useState} from "react";
import {getAllOrders, getStatusData, getWeeklyRevenue} from "@/services/order.service.js";
import {getShoes} from "@/services/shoes.service.js";
import {getCustomers} from "@/services/user.service.js";
import NumberCounter from "@/components/NumberCounter.jsx";
import {getCategoryData} from "@/services/category.service.js";
import {Skeleton} from "@/components/ui/skeleton.jsx";

const Dashboard = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [weeklyRevenue, setWeeklyRevenue] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [orderStatusData, setOrderStatusData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [ordersRes, productsRes, customersRes, weeklyRes, categoryRes, statusRes] = await Promise.all([
                    getAllOrders(),
                    getShoes(),
                    getCustomers(),
                    getWeeklyRevenue(),
                    getCategoryData(),
                    getStatusData()
                ]);

                // Orders
                if (ordersRes.success) {
                    const orders = ordersRes.data;
                    setTotalRevenue(
                        orders.reduce((acc, order) => {
                            if (order.status === "cancelled") return acc;
                            return acc + parseInt(order.discount_bill || order.total_bill);
                        }, 0)
                    );
                    setTotalOrders(orders.length);
                }

                // Products
                if (productsRes.success) {
                    setTotalProducts(productsRes.data.length);
                }

                // Customers
                if (customersRes.success) {
                    setTotalCustomers(customersRes.data.length);
                }

                // Weekly Revenue
                if (weeklyRes.success) {
                    setWeeklyRevenue(weeklyRes.data);
                }

                // Category Data
                if (categoryRes.success) {
                    const catData = {};
                    categoryRes.data.forEach(item => {
                        catData[item.name] = item.count;
                    });
                    setCategoryData(catData);
                }

                // Order Status Data
                if (statusRes.success) {
                    setOrderStatusData(statusRes.data);
                }

            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    return (
        <>
            {loading ? (
                <div className="flex flex-col gap-4">
                    {/* Stat Cards Skeleton */}
                    <div className="grid grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Card className="bg-white rounded-[30px]" key={idx}>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 w-24" />
                                        </div>
                                        <Skeleton className="w-12 h-12 rounded-full" />
                                    </div>
                                    <Skeleton className="h-8 w-28 mt-2" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Revenue + Pie Chart Skeleton */}
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <div className="col-span-2">
                            <div className="bg-white rounded-[30px] h-[300px]">
                                <div className="h-full flex items-center justify-center">
                                    <Skeleton className="w-full h-full" />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="bg-white rounded-[30px] h-[300px]">
                                <div className="h-full flex items-center justify-center">
                                    <Skeleton className="w-full h-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Doughnut + Line Chart Skeleton */}
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <div className="col-span-1">
                            <div className="bg-white rounded-[30px] h-[300px]">
                                <div className="h-full flex items-center justify-center">
                                    <Skeleton className="w-full h-full" />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="bg-white rounded-[30px] h-[300px]">
                                <div className="h-full flex items-center justify-center">
                                    <Skeleton className="w-full h-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-4 gap-4">
                        <Card className="bg-white rounded-[30px]">
                            <CardContent>
                                <div className="flex-between">
                                    <h2 className="text-lg text-muted-foreground">Total Revenue</h2>
                                    <div
                                        className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-100/50">
                                        <HandCoins className="text-teal-600 w-6 h-6"/>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold mt-2">
                                    <NumberCounter amount={totalRevenue} prefix="$"/>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white rounded-[30px]">
                            <CardContent>
                                <div className="flex-between">
                                    <h2 className="text-lg text-muted-foreground">Total Orders</h2>
                                    <div
                                        className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100/50">
                                        <ShoppingCart className="text-blue-700 w-6 h-6"/>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold mt-2">
                                    <NumberCounter amount={totalOrders}/>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white rounded-[30px]">
                            <CardContent>
                                <div className="flex-between">
                                    <h2 className="text-lg text-muted-foreground">Total Customers</h2>
                                    <div
                                        className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100/50">
                                        <User className="text-green-600 w-6 h-6"/>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold mt-2">
                                    <NumberCounter amount={totalCustomers}/>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white rounded-[30px]">
                            <CardContent>
                                <div className="flex-between">
                                    <h2 className="text-lg text-muted-foreground">Total Products</h2>
                                    <div
                                        className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100/50">
                                        <CreditCard className="text-yellow-700 w-6 h-6"/>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold mt-2">
                                    <NumberCounter amount={totalProducts}/>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid grid-cols-3 gap-4 flex items-center">
                        <div className="col-span-2">
                            <RevenueBarChart chartData={weeklyRevenue}/>
                        </div>
                        <div className="col-span-1">
                            <OrderStatusPieChart chartData={orderStatusData}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 flex items-center">
                        <div className="col-span-1">
                            <CategoryDoughnutChart chartData={categoryData}/>
                        </div>
                        <div className="col-span-2">
                            <CustomerLineChart/>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Dashboard;