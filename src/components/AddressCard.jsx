import { Card, CardContent, CardFooter } from "@/components/ui/card.jsx";
import { Label } from "@/components/ui/label.jsx";
import PropTypes from "prop-types";
import {Button} from "@/components/ui/button.jsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {Pencil, Trash2} from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.jsx";

function AddressCard({ address, handleEdit, handleDelete, setSelectedAddress, active }) {
    return (
        <Card
            className={`cursor-pointer py-0 gap-0 border-[2px] ${
                active ? "border-primary" : ""
            }`}
        >
            <CardContent className="grid p-4 gap-4">
                <Label>Street: {address?.street}</Label>
                <Label>Ward: {address?.ward}</Label>
                <Label>District: {address?.district}</Label>
                <Label>City: {address?.city}</Label>
                <Label>Country: {address?.country}</Label>
                <Label>Phone: {address?.phone}</Label>
            </CardContent>
            <CardFooter className="pr-3 pb-3 flex justify-end gap-1">
                {handleEdit && handleDelete ? (
                    <>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button className="cursor-pointer" onClick={() => handleEdit(address)}>
                                        <Pencil />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <AlertDialog>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" className="cursor-pointer">
                                                <Trash2 />
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
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. It will permanently delete this item.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="cursor-pointer border-primary">Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="cursor-pointer bg-red-500 hover:bg-red-400" onClick={() => handleDelete(address?.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                ) : (
                    <Button
                        className="cursor-pointer"
                        disabled={active}
                        onClick={() => setSelectedAddress(address)}
                    >
                        {active ? "Selected" : "Select"}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

AddressCard.propTypes = {
    address: PropTypes.object.isRequired,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func,
    setSelectedAddress: PropTypes.func,
    active: PropTypes.bool,
};

export default AddressCard;