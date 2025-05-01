import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ItemCard = ({ item }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            className="cursor-pointer rounded-lg"
            onClick={() => navigate(`/detail/${item.id}`)}
            whileTap={{scale: 0.9}}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{ type: "spring", stiffness: 100, damping: 25 }}
        >
            <div className="overflow-hidden rounded-lg">
                <img className="hover:scale-110 transition ease-in-out" src={item.image_url} alt={item.name}/>
            </div>
            <div className="text-md leading-none font-medium mt-2">{item.name}</div>
            <div className="text-md font-semibold text-foreground mt-1">${item.price}</div>
        </motion.div>
    );
}

ItemCard.propTypes = {
    item: PropTypes.object,
}

export default ItemCard;