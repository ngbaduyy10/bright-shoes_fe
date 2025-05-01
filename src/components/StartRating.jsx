import PropTypes from "prop-types";
import { StarIcon } from "lucide-react";

function StarRating({ rating, handleRatingChange }) {
    return [1, 2, 3, 4, 5].map((star) => (
        <div
            key={star}
            className={`p-1 rounded-full transition-colors ${
                handleRatingChange
                    ? `cursor-pointer ${
                        star <= rating
                            ? "text-yellow-500 hover:bg-black"
                            : "text-black hover:bg-primary hover:text-white"
                    }`
                    : `${star <= rating ? "text-yellow-500" : "text-black"}`
            }`}
            onClick={handleRatingChange ? () => handleRatingChange(star) : null}
        >
            <StarIcon className={`w-5 h-5 ${star <= rating ? "fill-yellow-500" : "fill-black"}`} />
        </div>
    ));
}

StarRating.propTypes = {
    rating: PropTypes.number,
    handleRatingChange: PropTypes.func,
}

export default StarRating;