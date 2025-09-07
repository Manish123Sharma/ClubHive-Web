import React, { useEffect, useRef, useState } from 'react'
import './PopularEvent.css';
import EventCard from '../Event Card/EventCard';
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { getEventbyCountry, getEventbyCity } from '../../redux/slices/eventSlics';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';

const PopularEvent = ({
    backgroundColor,
    country,
    city
}) => {

    const dispatch = useDispatch();
    const [localEvents, setLocalEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const sliderRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                let action;
                if (country) {
                    action = await dispatch(getEventbyCountry(country));
                } else if (city) {
                    action = await dispatch(getEventbyCity(city));
                }

                if (action.meta.requestStatus === "fulfilled") {
                    setLocalEvents(action.payload);
                } else {
                    setLocalEvents([]);
                }
            } catch (err) {
                console.error(err);
                setLocalEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [dispatch, country, city]);

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

    const titleLocation = country || city;

    return (
        <div className="popular_events_wrapper" style={{ backgroundColor }}>
            <div className="popular_event">
                <div className="view_all_panel">
                    <div className="upper_panel">
                        <h2>
                            Popular Events
                        </h2>
                        <a href="#">In {titleLocation}</a>
                    </div>
                    <div className="lower_panel">
                        <p>
                            View All
                        </p>
                        <FaArrowRight className="arrow_icon" />
                    </div>
                </div>
                {loading
                    ? <Loader />
                    : (
                        <div className="slider-wrapper">
                            {canScrollLeft && (
                                <button className="arrow left" onClick={() => scroll('left')}>
                                    ◀
                                </button>
                            )}
                            <div className="slider-container" ref={sliderRef}>
                                {localEvents && localEvents.length > 0 ? (
                                    localEvents.map((event, i) => (
                                        <EventCard date={event.eventDate} city={event.city} price={event.price} pic={event.photos[0]} name={event.name} key={event._id || i} event={event} />
                                    ))
                                ) : (
                                    <p>No events found in {titleLocation}</p>
                                )}
                            </div>
                            {canScrollRight && (
                                <button className="arrow right" onClick={() => scroll('right')}>
                                    ▶
                                </button>
                            )}
                        </div>
                    )
                }

            </div>
        </div>
    );
}
PopularEvent.propTypes = {
    backgroundColor: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string
};

export default PopularEvent;

