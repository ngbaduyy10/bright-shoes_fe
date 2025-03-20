import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ item }) => {
    const navigate = useNavigate();

    return (
        <div className="cursor-pointer rounded-lg" onClick={() => navigate(`/detail/${item.id}`)}>
            <div className="overflow-hidden rounded-lg">
                <img className="hover:scale-110 transition ease-in-out" src={item.image_url} alt={item.name} />
            </div>
            <div className="text-md leading-none font-medium mt-2">{item.name}</div>
            <div className="text-md font-semibold text-foreground mt-1">${item.price}</div>
        </div>
    );
}

ItemCard.propTypes = {
    item: PropTypes.object,
}

export default ItemCard;