import React from 'react';
import './EventCard.css';
import { FaHeart, FaShareAlt } from "react-icons/fa";

const EventCard = () => {
    return (
        <div className="event-card" onClick={() => {console.log('Indian Events');}}>
            {/* Top image with icons */}
            <div className="event-image-container">
                <img
                    className="event-image"
                    src="https://www.topgear.com/sites/default/files/2025/01/1-Defender-Octa-review-2025.jpg?w=976&h=549"
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
                    Sinhagad Half Marathon - Promo Run
                </h3>
                <p className="event-subtitle">Sep 07 | Pune</p>
                <p className="event-price">Free</p>
            </div>
        </div>
    );
}

export default EventCard;
