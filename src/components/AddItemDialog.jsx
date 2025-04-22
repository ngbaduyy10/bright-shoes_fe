import propTypes from "prop-types";
import {Dialog, DialogContent} from "@/components/ui/dialog.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";

const AddItemDialog = ({open, setOpen, formData, setFormData, handleAddItem, handleEditItem}) => {
    const handleCloseDialog = () => {
        setOpen(false);
        setFormData(null);
    }

    return (
        <Dialog open={open} onOpenChange={handleCloseDialog}>
            <DialogContent className="flex flex-col gap-4">
                <div className="text-xl font-semibold">{formData?.id ? "EDIT SHOES" : "ADD NEW SHOES"}</div>
                <Input
                    type="text"
                    value={formData?.name}
                    placeholder="Name"
                    onChange={(event) => setFormData({...formData, name: event.target.value})}
                />
                <Textarea
                    type="text"
                    value={formData?.description}
                    placeholder="Description"
                    onChange={(event) => setFormData({...formData, description: event.target.value})}
                />
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        value={formData?.price}
                        placeholder="Price"
                        onChange={(event) => setFormData({...formData, price: event.target.value})}
                    />
                    <Input
                        type="number"
                        value={formData?.quantity}
                        placeholder="Quantity"
                        onChange={(event) => setFormData({...formData, quantity: event.target.value})}
                    />
                </div>
                <Select
                    onValueChange={(value) =>
                        setFormData({
                            ...formData,
                            category_id: value,
                        })
                    }
                    value={formData?.category_id?.toString()}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1" className="hover:bg-accent cursor-pointer">
                            Men
                        </SelectItem>
                        <SelectItem value="2" className="hover:bg-accent cursor-pointer">
                            Women
                        </SelectItem>
                        <SelectItem value="3" className="hover:bg-accent cursor-pointer">
                            Kids
                        </SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex items-center justify-end gap-1">
                    <Button variant="outline" className="cursor-pointer" onClick={handleCloseDialog}>Cancel</Button>
                    <Button className="cursor-pointer" onClick={formData?.id ? handleEditItem : handleAddItem}>
                        {formData?.id ? "Change" : "Add"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

AddItemDialog.propTypes = {
    open: propTypes.bool,
    setOpen: propTypes.func,
    formData: propTypes.object,
    setFormData: propTypes.func,
    handleAddItem: propTypes.func,
    handleEditItem: propTypes.func,
}

export default AddItemDialog;

