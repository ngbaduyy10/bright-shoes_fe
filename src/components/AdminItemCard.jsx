import propTypes from 'prop-types';
import { Button } from '@/components/ui/button.jsx';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogDescription } from '@/components/ui/alert-dialog.jsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.jsx';
import { Pencil, Trash2 } from 'lucide-react';

const AdminItemCard = ({ item, handleEdit, handleDelete }) => {
    return (
        <div className="cursor-pointer rounded-lg">
            <div className="overflow-hidden rounded-lg">
                <img className="hover:scale-110 transition ease-in-out" src={item.image_url} alt={item.name} />
            </div>
            <div className="text-md leading-none font-medium mt-2">{item.name}</div>
            <div className="text-md font-semibold text-foreground mt-1">${item.price}</div>
            <div className="flex justify-end items-center gap-1 mt-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button className="bg-blue-500 cursor-pointer hover:bg-blue-500" onClick={() => handleEdit(item)}>
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
                                    <Button className="bg-red-500 cursor-pointer hover:bg-red-600">
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
                            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                            <AlertDialogAction className="cursor-pointer bg-red-500 hover:bg-red-400" onClick={() => handleDelete(item.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}

AdminItemCard.propTypes = {
    item: propTypes.object,
    handleEdit: propTypes.func,
    handleDelete: propTypes.func,
}

export default AdminItemCard;