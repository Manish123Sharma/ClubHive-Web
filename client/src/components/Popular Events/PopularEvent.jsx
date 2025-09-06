import React, { useEffect, useRef, useState } from 'react'
import './PopularEvent.css';
import EventCard from '../Event Card/EventCard';
import { FaArrowRight } from "react-icons/fa";

const PopularEvent = ({
    backgroundColor,
    location
}) => {

    const sliderRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkForScrollPosition = () => {
        const slider = sliderRef.current;
        if (!slider) return;

        setCanScrollLeft(slider.scrollLeft > 0);
        setCanScrollRight(slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 1);
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            checkForScrollPosition();
            slider.addEventListener("scroll", checkForScrollPosition);
        }
        return () => {
            if (slider) slider.removeEventListener("scroll", checkForScrollPosition);
        };
    }, []);


    const scroll = (direction) => {
        if (direction === 'left') {
            sliderRef.current.scrollBy({ left: -250, behavior: 'smooth' });
        } else {
            sliderRef.current.scrollBy({ left: 250, behavior: 'smooth' });
        }
    };

    return (
        <div className="popular_events_wrapper" style={{'backgroundColor':{backgroundColor}}}>
            <div className="popular_event">
                <div className="view_all_panel">
                    <div className="upper_panel">
                        <h2>
                            Popular Events
                        </h2>
                        <a href="#">In {location}</a>
                    </div>
                    <div className="lower_panel">
                        <p>
                            View All
                        </p>
                        <FaArrowRight className="arrow_icon" />
                    </div>
                </div>
                <div className="slider-wrapper">
                    {canScrollLeft && (
                        <button className="arrow left" onClick={() => scroll('left')}>
                            ◀
                        </button>
                    )}
                    <div className="slider-container" ref={sliderRef}>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <EventCard key={i} />
                        ))}
                    </div>
                    {canScrollRight && (
                        <button className="arrow right" onClick={() => scroll('right')}>
                            ▶
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PopularEvent;

