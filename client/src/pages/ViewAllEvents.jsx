import React, { useEffect, useState } from 'react';
import './styles/ViewAllEvents.css';
import FilterBar from '../components/Filter/FilterBar';
import Header from '../components/Header/Header';
import EventCard from '../components/Event Card/EventCard';
import { useDispatch } from 'react-redux';
import { getEventbyCountry, getEventbyCity } from '../redux/slices/eventSlics';
import Loader from '../components/Loader/Loader';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import { getEventbyName } from '../redux/slices/eventSlics';

const ViewAllEvents = () => {

    const dispatch = useDispatch();
    const [localEvents, setLocalEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const country = queryParams.get("country");
    const city = queryParams.get("city");
    const name = queryParams.get("name");

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                let action;
                if (country) {
                    action = await dispatch(getEventbyCountry(country));
                } else if (city) {
                    action = await dispatch(getEventbyCity(city));
                } else if (name) {
                    action = await dispatch(getEventbyName(name));
                }

                if (action?.meta?.requestStatus === "fulfilled") {
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
    }, [dispatch, country, city, name]);

    const titleLocation = country || city || name;

    return (
        <div className="view-events-page">
            <Header />
            {/* <FilterBar /> */}

            {
                loading ?
                    <Loader />
                    :
                    <div className="page_content">
                        {/* Heading Section */}
                        <div className="page_header">
                            <h1>Events In {titleLocation}</h1>
                            <p>showing {localEvents.length} Events in <span>{titleLocation}</span></p>
                        </div>

                        {/* Events Grid */}
                        <div className="events_grid">
                            {
                                localEvents && localEvents.length > 0
                                    ?
                                    (localEvents.map((event, i) => (
                                        <EventCard date={event.eventDate} city={event.city} price={event.price} pic={event.photos[0]} name={event.name} key={event._id || i} event={event} />
                                    )))
                                    :
                                    (
                                        <p>No events found in {titleLocation}</p>
                                    )
                            }
                        </div>
                    </div>
            }
            <Footer />
        </div>
    );
}

export default ViewAllEvents;
