import {useEffect, useState} from 'react';
import {createAdmin, getAdmins, updateAdmin} from "@/services/user.service.js";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {getAdminRoleColor, getAdminRoleLabel, getGenderColor} from "@/utils/index.js";
import {Input} from "@/components/ui/input.jsx";
import {CopyPlus, Pencil, Trash2, Lock} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.jsx";
import dayjs from "dayjs";
import AddAdminDialog from "@/components/AddAdminDialog.jsx";
import {toast} from "sonner";

const  Admin = () => {
    const [adminList, setAdminList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [dialogLoading, setDialogLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        const fetchAdminList = async () => {
            setLoading(true);
            const response = await getAdmins({keyword});
            if (response.success) {
                setAdminList(response.data);
            }
            setLoading(false);
        };

        fetchAdminList();
    }, [reload, keyword]);

    const handleEdit = (item) => {
        setFormData(item);
        setImageUrl(item.image_url);
        setDialogOpen(true);
    }

    const handleAddAdmin = async () => {
        setDialogLoading(true);
        if (!formData?.first_name || !formData?.last_name || !formData?.email || !formData?.gender || !formData?.role || !imageFile) {
            toast.error("Please fill all fields");
            setDialogLoading(false);
            return;
        }

        const data = new FormData();
        data.append("first_name", formData.first_name);
        data.append("last_name", formData.last_name);
        data.append("email", formData.email);
        data.append("gender", formData.gender);
        data.append("role", formData.role);
        data.append("image_url", imageFile);
        const response = await createAdmin(data);
        if (response.success) {
            setDialogOpen(false);
            setFormData(null);
            setImageFile(null);
            setImageUrl(null);
            setReload(!reload);
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        setDialogLoading(false);
    }

    const handleEditAdmin = async () => {
        setDialogLoading(true);
        const data = new FormData();
        data.append("first_name", formData.first_name);
        data.append("last_name", formData.last_name);
        data.append("email", formData.email);
        data.append("gender", formData.gender);
        data.append("role", formData.role);
        if (imageFile) {
            data.append("image_url", imageFile);
        } else if (imageUrl) {
            data.append("image_url", imageUrl);
        }

        const response = await updateAdmin(formData.id, data);
        if (response.success) {
            setDialogOpen(false);
            setFormData(null);
            setImageFile(null);
            setImageUrl(null);
            setReload(!reload);
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        setDialogLoading(false);
    }

    return (
        <>
            <div className="w-full flex items-center justify-between gap-4 mt-4 mb-2">
                <Input
                    type="text"
                    placeholder="Search"
                    className="w-full sm:w-[400px]"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <Button className="bg-primary cursor-pointer" onClick={() => setDialogOpen(true)}>
                    <CopyPlus/>
                    Add New Admin
                </Button>
            </div>
            {loading ? (
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-white">
                            <TableHead className="font-semibold">Image</TableHead>
                            <TableHead className="text-center font-semibold">Name</TableHead>
                            <TableHead className="text-center font-semibold">Email</TableHead>
                            <TableHead className="text-center font-semibold">Gender</TableHead>
                            <TableHead className="text-center font-semibold">Role</TableHead>
                            <TableHead className="text-center font-semibold">Registration Date</TableHead>
                            <TableHead className="text-center font-semibold">
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array(10).fill(0).map((_, idx) => (
                            <TableRow key={idx}>
                                <TableCell><Skeleton className="h-10 w-10 rounded-full"/></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-24 mx-auto"/></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-32 mx-auto"/></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-16 mx-auto"/></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-20 mx-auto"/></TableCell>
                                <TableCell className="text-center"><Skeleton className="h-4 w-24 mx-auto"/></TableCell>
                                <TableCell className="text-center"><Skeleton
                                    className="h-8 w-20 mx-auto rounded-md"/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <>
                    {adminList.length === 0 ? (
                        <div className="text-lg text-gray-500">
                            No admin found
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
                                        Role
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
                                {adminList.map((admin) => (
                                    <TableRow key={admin.id}>
                                        <TableCell>
                                            {admin?.image_url ? (
                                                <img
                                                    src={admin?.image_url}
                                                    alt={admin?.first_name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                            ) : (
                                                <div>No Image</div>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {admin?.first_name} {admin?.last_name}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {admin?.email}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge className={`py-1 px-3 ${getGenderColor(admin?.gender)}`}>
                                                {admin?.gender ? admin.gender.charAt(0).toUpperCase() + admin.gender.slice(1) : "Not Specified"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge className={`py-1 px-3 ${getAdminRoleColor(admin?.role)}`}>
                                                {getAdminRoleLabel(admin?.role)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {dayjs(admin?.registration_date).format("DD-MM-YYYY")}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex-center gap-1">
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                className="cursor-pointer bg-white text-black hover:bg-primary hover:text-white border"
                                                                onClick={() => handleEdit(admin)}
                                                            >
                                                                <Pencil/>
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Edit</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>

                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                className="cursor-pointer bg-white text-black hover:bg-primary hover:text-white border">
                                                                <Lock/>
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>Inactive</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>

                                                <AlertDialog>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button
                                                                        className="cursor-pointer bg-white text-black hover:bg-primary hover:text-white border">
                                                                        <Trash2/>
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Delete</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>

                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely
                                                                sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. It will permanently delete
                                                                this voucher.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel
                                                                className="cursor-pointer">Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                className="cursor-pointer bg-red-500 hover:bg-red-400">Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </>
            )}

            <AddAdminDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                formData={formData}
                setFormData={setFormData}
                setImageFile={setImageFile}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                handleAddAdmin={handleAddAdmin}
                handleEditAdmin={handleEditAdmin}
                loading={dialogLoading}
            />
        </>
    );
}

export default Admin;