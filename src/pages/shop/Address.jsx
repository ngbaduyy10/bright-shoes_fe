import {Button} from "@/components/ui/button.jsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {useEffect, useState} from "react";
import AddressDialog from "@/components/AddressDialog.jsx";
import {useUser} from "@clerk/clerk-react";
import {addAddress, getAddress, editAddress, deleteAddress} from "@/services/address.service.js";
import {toast} from "sonner";
import AddressCard from "@/components/AddressCard.jsx";
import {LoaderCircle} from "lucide-react";

const Address = () => {
    const { user } = useUser();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const [addressList, setAddressList] = useState([]);
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAddress = async () => {
            setLoading(true);
            const response = await getAddress(user.id);
            if (response.success) {
                setAddressList(response.data);
            }
            setLoading(false);
        }

        if (user) {
            fetchAddress();
        }
    }, [user, reload]);

    const handleEditButton = (address) => {
        setFormData(address);
        setDialogOpen(true);
    }

    const handleAddAddress = async () => {
        const response = await addAddress({ ...formData, userId: user.id });
        if (response.success) {
            setDialogOpen(false);
            setFormData(null);
            setReload(!reload);
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    }

    const handleEditAddress = async () => {
        const response = await editAddress(formData.id, { ...formData });
        if (response.success) {
            setDialogOpen(false);
            setFormData(null);
            setReload(!reload);
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    }

    const handleDeleteAddress = async (id) => {
        const response = await deleteAddress(id);
        if (response.success) {
            setReload(!reload);
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="animate-spin flex-center">
                            <LoaderCircle/>
                        </div>
                    ) : (
                        <>
                            {addressList.length === 0 ? (
                                <div className="text-lg text-gray-500">You have no saved address. Please add your address</div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-2">
                                    {addressList.map((address) => (
                                        <AddressCard
                                            key={address.id}
                                            address={address}
                                            handleEdit={handleEditButton}
                                            handleDelete={handleDeleteAddress}
                                        />
                                    ))}
                                </div>
                            )}

                            <Button
                                className="w-[200px] cursor-pointer mt-3"
                                onClick={() => setDialogOpen(true)}
                                disabled={addressList.length >= 3}
                            >
                                Add New Address
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>

            <AddressDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                formData={formData}
                setFormData={setFormData}
                handleAddAddress={handleAddAddress}
                handleEditAddress={handleEditAddress}
            />
        </>
    )
}

export default Address;