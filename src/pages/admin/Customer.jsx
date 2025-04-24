import {useEffect, useState} from 'react';
import {getCustomers} from "@/services/user.service.js";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import {dayjsDate} from "@/utils/dayjsConfig.js";
import {Button} from "@/components/ui/button.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {getCustomerMembershipColor, getGenderColor} from "@/utils/index.js";
import {Input} from "@/components/ui/input.jsx";

const Customer = () => {
    const [customerList, setCustomerList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCustomerList = async () => {
            setLoading(true);
            const response = await getCustomers();
            if (response.success) {
                setCustomerList(response.data);
            }
            setLoading(false);
        };

        fetchCustomerList();
    }, []);

    return (
        <>
            <Input
                type="text"
                placeholder="Search"
                className="w-full sm:w-[400px] mt-4 mb-2"
            />
            {loading ? (
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-white">
                            <TableHead className="font-semibold">Image</TableHead>
                            <TableHead className="text-center font-semibold">Name</TableHead>
                            <TableHead className="text-center font-semibold">Email</TableHead>
                            <TableHead className="text-center font-semibold">Gender</TableHead>
                            <TableHead className="text-center font-semibold">Membership</TableHead>
                            <TableHead className="text-center font-semibold">Registration Date</TableHead>
                            <TableHead className="text-center font-semibold">
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array(10).fill(0).map((_, idx) => (
                            <TableRow key={idx}>
                                <TableCell><Skeleton className="h-10 w-10 rounded-full" /></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-24 mx-auto" /></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-32 mx-auto" /></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-16 mx-auto" /></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-20 mx-auto" /></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-24 mx-auto" /></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-8 w-20 mx-auto rounded-md" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <>
                    {customerList.length === 0 ? (
                        <div className="text-lg text-gray-500">
                            No customer found
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-white">
                                    <TableHead className="font-semibold">
                                        Image
                                    </TableHead>
                                    <TableHead className="text-center font-semibold">
                                        Name
                                    </TableHead>
                                    <TableHead className="text-center font-semibold">
                                        Email
                                    </TableHead>
                                    <TableHead className="text-center font-semibold">
                                        Gender
                                    </TableHead>
                                    <TableHead className="text-center font-semibold">
                                        Membership
                                    </TableHead>
                                    <TableHead className="text-center font-semibold">
                                        Registration Date
                                    </TableHead>
                                    <TableHead className="text-center font-semibold">
                                    <span className="sr-only">
                                        Details
                                    </span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customerList.map((customer) => (
                                    <TableRow key={customer.id}>
                                        <TableCell>
                                            {customer?.image_url ? (
                                                <img
                                                    src={customer?.image_url}
                                                    alt={customer?.first_name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                            ) : (
                                                <div>No Image</div>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {customer?.first_name} {customer?.last_name}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {customer?.email}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge className={`py-1 px-3 ${getGenderColor(customer?.gender)}`}>
                                                {customer?.gender ? customer.gender.charAt(0).toUpperCase() + customer.gender.slice(1) : "Not Specified"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge className={`py-1 px-3 ${getCustomerMembershipColor(customer?.membership)}`}>
                                                {customer?.membership.toUpperCase()}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {dayjsDate(
                                                customer?.registration_date,
                                            )}
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

export default Customer;