import CountUp from "react-countup";
import propTypes from "prop-types";

const NumberCounter = ({amount, prefix}) => {
    return (
        <CountUp
            end={amount}
            duration={1}
            decimal=","
            prefix={prefix}
        />
    );
}

NumberCounter.propTypes = {
    amount: propTypes.number.isRequired,
    prefix: propTypes.string
}

export default NumberCounter;