import { Card, CardContent, CardFooter } from "@/components/ui/card.jsx";
import { Label } from "@/components/ui/label.jsx";
import PropTypes from "prop-types";
import {Button} from "@/components/ui/button.jsx";

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
                        <Button variant="destructive" className="cursor-pointer" onClick={() => handleDelete(address?.id)}>Delete</Button>
                        <Button className="cursor-pointer" onClick={() => handleEdit(address)}>Edit</Button>
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