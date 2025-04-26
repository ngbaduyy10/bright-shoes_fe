import propTypes from "prop-types";
import {Dialog, DialogContent} from "@/components/ui/dialog.jsx";
import UploadImage from "@/components/UploadImage.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";
import {LoaderCircle} from "lucide-react";

const AddAdminDialog = ({open, setOpen, formData, setFormData, setImageFile, imageUrl, setImageUrl, handleAddAdmin, handleEditAdmin, loading}) => {
    const handleCloseDialog = () => {
        setOpen(false);
        setFormData(null);
        setImageFile(null);
        setImageUrl(null);
    }

    return (
        <Dialog open={open} onOpenChange={handleCloseDialog}>
            <DialogContent className="flex flex-col gap-4">
                <div className="text-xl font-semibold">{formData?.id ? "EDIT ADMIN" : "ADD NEW ADMIN"}</div>
                <UploadImage
                    setImageFile={setImageFile}
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                />
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        value={formData?.first_name}
                        placeholder="First Name"
                        onChange={(event) => setFormData({...formData, first_name: event.target.value})}
                    />
                    <Input
                        type="text"
                        value={formData?.last_name}
                        placeholder="Last Name"
                        onChange={(event) => setFormData({...formData, last_name: event.target.value})}
                    />
                </div>
                <Input
                    type="email"
                    value={formData?.email}
                    placeholder="Email"
                    onChange={(event) => setFormData({...formData, email: event.target.value})}
                />
                <div className="flex items-center gap-2">
                    <Select
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                gender: value,
                            })
                        }
                        value={formData?.gender}
                    >
                        <SelectTrigger className="w-full cursor-pointer">
                            <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male" className="hover:bg-accent cursor-pointer">
                                Male
                            </SelectItem>
                            <SelectItem value="female" className="hover:bg-accent cursor-pointer">
                                Female
                            </SelectItem>
                            <SelectItem value="other" className="hover:bg-accent cursor-pointer">
                                Other
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Select
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                role: value,
                            })
                        }
                        value={formData?.role}
                    >
                        <SelectTrigger className="w-full cursor-pointer">
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="super_admin" className="hover:bg-accent cursor-pointer">
                                Super Admin
                            </SelectItem>
                            <SelectItem value="manager" className="hover:bg-accent cursor-pointer">
                                Manager
                            </SelectItem>
                            <SelectItem value="staff" className="hover:bg-accent cursor-pointer">
                                Staff
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-end gap-1">
                    <Button variant="outline" className="cursor-pointer" disabled={loading} onClick={handleCloseDialog}>Cancel</Button>
                    <Button className="cursor-pointer w-[60px]" disabled={loading} onClick={formData?.id ? handleEditAdmin : handleAddAdmin}>
                        {loading ? (
                            <div className="animate-spin flex-center">
                                <LoaderCircle />
                            </div>
                        ) : (
                            formData?.id ? "Edit" : "Add"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

AddAdminDialog.propTypes = {
    open: propTypes.bool,
    setOpen: propTypes.func,
    formData: propTypes.object,
    setFormData: propTypes.func,
    setImageFile: propTypes.func,
    imageUrl: propTypes.string,
    setImageUrl: propTypes.func,
    handleAddAdmin: propTypes.func,
    handleEditAdmin: propTypes.func,
    loading: propTypes.bool,
}

export default AddAdminDialog;