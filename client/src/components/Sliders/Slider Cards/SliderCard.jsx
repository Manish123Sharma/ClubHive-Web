import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import './SliderCard.css';
import { useNavigate } from 'react-router-dom';

const SliderCard = ({
    city,
    events,
    image,
    // onClick 
}) => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        if (city) {
            navigate(`/allevents?city=${city}`);
        }
    };
    return (
        <div
            className="city-card"
        onClick={handleNavigate}
        >
            <div
                className="city-card-image"
                style={{ backgroundImage: `url(${image})` }}
            >
                <h3>{city}</h3>
            </div>
            <div className="city-card-footer">
                <span>{events} Events</span>
                <FaArrowRight className="arrow-icon" />
            </div>
        </div>
    );
}

import PropTypes from 'prop-types';

SliderCard.propTypes = {
    city: PropTypes.string.isRequired,
    events: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
};

export default SliderCard;
