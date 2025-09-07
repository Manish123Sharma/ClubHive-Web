import React from 'react';
import PropTypes from 'prop-types';
import './EventCard.css';
import { FaHeart, FaShareAlt } from "react-icons/fa";

const EventCard = ({
    name,
    pic,
    date,
    city,
    price
}) => {

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        month: "short",   
        day: "2-digit",   
        year: "numeric"   
    });


    return (
        <div className="event-card" onClick={() => { console.log('Indian Events'); }}>
            {/* Top image with icons */}
            <div className="event-image-container">
                <img
                    className="event-image"
                    src={pic}
                    alt="Event"
                />
                <div className="event-icons">
                    <button className="icon-btn">
                        <FaHeart />
                    </button>
                    <button className="icon-btn">
                        <FaShareAlt />
                    </button>
                </div>
            </div>

            {/* Details */}
            <div className="event-details">
                <h3 className="event-title">
                    {name}
                </h3>
                <p className="event-subtitle">{formattedDate} | {city}</p>
                <p className="event-price">{price}</p>
            </div>
        </div>
    );
}

EventCard.propTypes = {
    name: PropTypes.string.isRequired,
    pic: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default EventCard;
