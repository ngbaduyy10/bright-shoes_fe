import {Button} from "@/components/ui/button.jsx";
import {useEffect, useState} from "react";
import AddressDialog from "@/components/AddressDialog.jsx";
import {useUser} from "@clerk/clerk-react";
import {addAddress, getAddress, editAddress, deleteAddress} from "@/services/address.service.js";
import {toast} from "sonner";
import AddressCard from "@/components/AddressCard.jsx";

const Address = () => {
    const { user } = useUser();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const [addressList, setAddressList] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        // const fetchAddress = async () => {
        //     const response = await getAddress(user.id);
        //     if (response.success) {
        //         setAddressList(response.data);
        //     }
        // }
        //
        // if (user) {
        //     fetchAddress();
        // }
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
            <div className="flex flex-col gap-4 w-full mt-4">
                <div className="text-2xl font-semibold text-black">Shipping Address</div>
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
                <Button
                    className="w-[200px] cursor-pointer"
                    onClick={() => setDialogOpen(true)}
                    disabled={addressList.length >= 3}
                >
                    Add New Address
                </Button>
            </div>
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