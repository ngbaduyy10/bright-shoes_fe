import PropTypes from "prop-types";
import {Dialog, DialogContent} from "@/components/ui/dialog.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";

const AddressDialog = ({ open, setOpen, formData, setFormData, handleAddAddress, handleEditAddress }) => {
    const handleCloseDialog = () => {
        setOpen(false);
        setFormData(null);
    }

    return (
        <Dialog open={open} onOpenChange={handleCloseDialog}>
            <DialogContent className="flex flex-col gap-4">
                <div className="text-xl font-semibold">{formData?.id ? "EDIT ADDRESS" : "ADD NEW ADDRESS"}</div>
                <Input
                    type="text"
                    value={formData?.street}
                    placeholder="Street"
                    onChange={(event) => setFormData({...formData, street: event.target.value})}
                />
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        value={formData?.ward}
                        placeholder="Ward"
                        onChange={(event) => setFormData({...formData, ward: event.target.value})}
                    />
                    <Input
                        type="text"
                        value={formData?.district}
                        placeholder="District"
                        onChange={(event) => setFormData({...formData, district: event.target.value})}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        value={formData?.city}
                        placeholder="City"
                        onChange={(event) => setFormData({...formData, city: event.target.value})}
                    />
                    <Input
                        type="text"
                        value={formData?.country}
                        placeholder="Country"
                        onChange={(event) => setFormData({...formData, country: event.target.value})}
                    />
                </div>
                <Input
                    type="text"
                    value={formData?.phone}
                    placeholder="Phone Number"
                    onChange={(event) => setFormData({...formData, phone: event.target.value})}
                />
                <div className="flex items-center justify-end gap-1">
                    <Button variant="outline" className="cursor-pointer" onClick={handleCloseDialog}>Cancel</Button>
                    <Button
                        className="cursor-pointer"
                        onClick={formData?.id ? handleEditAddress : handleAddAddress}
                    >
                        {formData?.id ? "Change" : "Add"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

AddressDialog.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    formData: PropTypes.object,
    setFormData: PropTypes.func,
    handleAddAddress: PropTypes.func,
    handleEditAddress: PropTypes.func,
}

export default AddressDialog;