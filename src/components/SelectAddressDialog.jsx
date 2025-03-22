import PropTypes from "prop-types";
import { Dialog, DialogContent} from "@/components/ui/dialog";
import AddressCard from "@/components/AddressCard";
import {Button} from "@/components/ui/button";

const SelectAddressDialog = ({ open, setOpen, addressList, selectedAddress, setSelectedAddress }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[600px] lg:max-w-[800px]">
                <div className="text-xl font-semibold">Select Address</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {addressList.map((address) => (
                        <AddressCard
                            key={address.id}
                            address={address}
                            setSelectedAddress={setSelectedAddress}
                            active={selectedAddress?.id === address.id}
                        />
                    ))}
                </div>
                <div className="flex justify-end">
                    <Button className="cursor-pointer" onClick={() => setOpen(false)}>Save</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

SelectAddressDialog.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    addressList: PropTypes.array,
    selectedAddress: PropTypes.object,
    setSelectedAddress: PropTypes.func,
}

export default SelectAddressDialog;