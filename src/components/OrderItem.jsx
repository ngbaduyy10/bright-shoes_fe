import PropTypes from "prop-types";

const OrderItem = ({ item }) => {
    return (
        <div className="flex space-x-4">
            <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded object-cover"
            />
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="font-semibold">
                        ${((item.salePrice > 0 ? item.salePrice : item.price) * item?.quantity).toFixed(1)}
                    </p>
                </div>
                <span className="text-sm">Quantity: {item?.quantity}</span>
            </div>
        </div>
    )
}

OrderItem.propTypes = {
    item: PropTypes.object,
}

export default OrderItem;