import {Button} from "@/components/ui/button.jsx";
import {useEffect, useState} from "react";
import {createShoes, getShoes, updateShoes, deleteShoes} from "@/services/shoes.service.js";
import AdminItemCard from "@/components/AdminItemCard.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";
import {CopyPlus} from "lucide-react";
import AddItemDialog from "@/components/AddItemDialog.jsx";
import {Input} from "@/components/ui/input.jsx";
import {toast} from "sonner";

const Shoes = () => {
    const [shoesList, setShoesList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [reload, setReload] = useState(false);
    const [dialogLoading, setDialogLoading] = useState(false);

    useEffect(() => {
        const fetchShoes = async () => {
            setLoading(true);
            const response = await getShoes({keyword});
            if (response.success) {
                setShoesList(response.data);
            }
            setLoading(false);
        }
        fetchShoes();
    }, [keyword, reload]);

    const handleEdit = (item) => {
        setFormData(item);
        setImageUrl(item.image_url);
        setDialogOpen(true);
    }

    const handleAddItem = async () => {
        setDialogLoading(true);
        if (!formData?.name || !formData?.description || !formData?.price || !formData?.quantity || !formData?.category_id || !imageFile) {
            toast.error("Please fill all fields");
            return;
        }

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("quantity", formData.quantity);
        data.append("category_id", formData.category_id);
        data.append("image_url", imageFile);
        const response = await createShoes(data);
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

    const handleEditItem = async () => {
        setDialogLoading(true);
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("quantity", formData.quantity);
        data.append("category_id", formData.category_id);
        if (imageFile) {
            data.append("image_url", imageFile);
        } else if (imageUrl) {
            data.append("image_url", imageUrl);
        }
        const response = await updateShoes(formData.id, data);
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

    const handleDelete = async (id) => {
        const response = await deleteShoes(id);
        if (response.success) {
            setReload(!reload);
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    }

    return (
        <>
            <div className="w-full flex items-center justify-between gap-4 mb-4">
                <Input
                    type="text"
                    placeholder="Search"
                    className="w-full sm:w-[400px]"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <Button className="bg-primary cursor-pointer" onClick={() => setDialogOpen(true)}>
                    <CopyPlus />
                    Add New Shoes
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {loading ? (
                    Array(20).fill(0).map((_, index) => (
                        <div className="cursor-pointer rounded-lg" key={index}>
                            <div className="overflow-hidden rounded-lg">
                                <Skeleton className="h-48 w-full"/>
                            </div>
                            <Skeleton className="h-4 w-3/4 mt-2"/>
                            <Skeleton className="h-4 w-1/4 mt-1"/>
                            <div className="flex justify-end items-center gap-2 mt-2">
                                <Skeleton className="h-9 w-9 rounded-md"/>
                                <Skeleton className="h-9 w-9 rounded-md"/>
                            </div>
                        </div>
                    ))
                ) : (
                    shoesList.length > 0 ? (
                        shoesList.length > 0 && shoesList.map((shoes) => (
                            <AdminItemCard
                                key={shoes.id}
                                item={shoes}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <div className="col-span-5 flex justify-center items-center">
                            <p>No shoes available</p>
                        </div>
                    )
                )}
            </div>

            <AddItemDialog
                setOpen={setDialogOpen}
                open={dialogOpen}
                formData={formData}
                setFormData={setFormData}
                setImageFile={setImageFile}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                handleAddItem={handleAddItem}
                handleEditItem={handleEditItem}
                loading={dialogLoading}
            />
        </>
    );
}

export default Shoes;