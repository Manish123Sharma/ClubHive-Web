import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import './SliderCard.css';

const SliderCard = ({ city, events, image, onClick }) => {
    return (
        <div className="city-card" onClick={onClick}>
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

export default SliderCard;
