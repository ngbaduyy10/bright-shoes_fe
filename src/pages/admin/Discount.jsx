import {useEffect, useState} from 'react';
import {getAllDiscounts} from "@/services/discount.service.js";
import {Input} from "@/components/ui/input.jsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {Button} from "@/components/ui/button.jsx";
import {CopyPlus} from "lucide-react";
import dayjs from 'dayjs';

const Discount = () => {
    const [discountList, setDiscountList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDiscounts = async () => {
            setLoading(true);
            const response = await getAllDiscounts();
            if (response.success) {
                setDiscountList(response.data);
            }
            setLoading(false);
        };

        fetchDiscounts();
    }, []);

    return (
        <>
            <div className="w-full flex items-center justify-between gap-4 mt-4 mb-2">
                <Input
                    type="text"
                    placeholder="Search"
                    className="w-full sm:w-[400px]"
                />
                <Button className="bg-primary cursor-pointer">
                    <CopyPlus/>
                    Add New Discount Voucher
                </Button>
            </div>
            {loading ? (
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-white">
                            <TableHead className="text-center font-semibold">Code</TableHead>
                            <TableHead className="text-center font-semibold">Name</TableHead>
                            <TableHead className="text-center font-semibold">Description</TableHead>
                            <TableHead className="text-center font-semibold">Type</TableHead>
                            <TableHead className="text-center font-semibold">Value</TableHead>
                            <TableHead className="text-center font-semibold">Min Order</TableHead>
                            <TableHead className="text-center font-semibold">Start Date</TableHead>
                            <TableHead className="text-center font-semibold">End Date</TableHead>
                            <TableHead className="text-center font-semibold">Limit Per User</TableHead>
                            <TableHead className="text-center font-semibold">Used/Total</TableHead>
                            <TableHead className="text-center font-semibold">Status</TableHead>
                            <TableHead className="text-center font-semibold">
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array(10).fill(0).map((_, idx) => (
                            <TableRow key={idx}>
                                <TableCell className="text-center"><Skeleton className="h-4 w-16 mx-auto" /></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-24 mx-auto" /></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-32 mx-auto" /></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-16 mx-auto" /></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-16 mx-auto" /></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-16 mx-auto" /></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-20 mx-auto" /></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-20 mx-auto" /></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-12 mx-auto" /></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-20 mx-auto" /></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-6 w-20 rounded-md mx-auto" /></TableCell>
                                <TableCell className="text-center">
                                    <Skeleton className="h-8 w-24 mx-auto rounded-md" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <>
                    {discountList.length === 0 ? (
                        <div className="text-lg text-gray-500">
                            No discount found
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-white">
                                    <TableHead className="text-center font-semibold">Code</TableHead>
                                    <TableHead className="text-center font-semibold">Name</TableHead>
                                    <TableHead className="text-center font-semibold">Description</TableHead>
                                    <TableHead className="text-center font-semibold">Type</TableHead>
                                    <TableHead className="text-center font-semibold">Value</TableHead>
                                    <TableHead className="text-center font-semibold">Min Order</TableHead>
                                    <TableHead className="text-center font-semibold">Start Date</TableHead>
                                    <TableHead className="text-center font-semibold">End Date</TableHead>
                                    <TableHead className="text-center font-semibold">Limit Per User</TableHead>
                                    <TableHead className="text-center font-semibold">Used/Total</TableHead>
                                    <TableHead className="text-center font-semibold">Status</TableHead>
                                    <TableHead className="text-center font-semibold">
                                        <span className="sr-only">Details</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {discountList.map((discount) => (
                                    <TableRow key={discount.id}>
                                        <TableCell className="text-center">{discount.code}</TableCell>
                                        <TableCell className="text-center">{discount.name}</TableCell>
                                        <TableCell className="text-center">{discount.description}</TableCell>
                                        <TableCell className="text-center capitalize">{discount.discount_type}</TableCell>
                                        <TableCell className="text-center">
                                            {discount.discount_type === "percent"
                                                ? `${discount.percentage_value}%`
                                                : `${discount.amount_value?.toLocaleString()}$`}
                                        </TableCell>
                                        <TableCell className="text-center">{discount.min_order_value?.toLocaleString()}$</TableCell>
                                        <TableCell className="text-center">
                                            {dayjs(discount.start_date).format("DD-MM-YYYY")}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {dayjs(discount.end_date).format("DD-MM-YYYY")}
                                        </TableCell>
                                        <TableCell className="text-center">{discount.limit_per_user}</TableCell>
                                        <TableCell className="text-center">
                                            {discount.used_quantity}/{discount.total_quantity}
                                        </TableCell>
                                        <TableCell className="text-center capitalize">
                                            <Badge className={
                                                discount.status === "active"
                                                    ? "bg-green-500"
                                                    : discount.status === "expired"
                                                        ? "bg-red-500"
                                                        : "bg-gray-500"
                                            }>
                                                {discount.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button className="cursor-pointer">
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </>
            )}
        </>
    );
}

export default Discount;