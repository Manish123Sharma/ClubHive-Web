import React from 'react';
import PropTypes from 'prop-types';
import './EventCard.css';
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EventCard = ({
    name,
    pic,
    date,
    city,
    price,
    id
}) => {

    const navigate = useNavigate();

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
    });


    return (
        <div className="event-card" onClick={() => navigate(`/eventdetail/${id}`)}>
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
                <div className="event_lower">
                    <p className="event-subtitle">{formattedDate} | {city}</p>
                    <p className="event-price">{price}</p>
                </div>

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
