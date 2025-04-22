import propTypes from 'prop-types';
import { Button } from '@/components/ui/button.jsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip.jsx';
import { Pencil, Trash2 } from 'lucide-react';

const AdminItemCard = ({ item, handleEdit }) => {
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
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button className="bg-red-500 cursor-pointer hover:bg-red-500">
                                <Trash2 />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delete</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
}

AdminItemCard.propTypes = {
    item: propTypes.object,
    handleEdit: propTypes.func,
}

export default AdminItemCard;