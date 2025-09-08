import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/EventDetail.module.css';  // import as styles
import Header from '../components/Header/Header';
import { FaRegHeart, FaShareAlt, FaTicketAlt, FaRegImage, FaBuilding } from 'react-icons/fa';
import { MdLocationOn, MdCalendarToday } from 'react-icons/md';
import Footer from '../components/Footer/Footer';
import { BiSolidMessageRounded } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import { getEventbyId } from '../redux/slices/eventSlics';
// import { FiTicket } from 'react-icons/fi';

const EventDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedEvent, loading, error } = useSelector((state) => state.events);

    const mainContentRef = useRef(null);
    const [activeSection, setActiveSection] = useState("event-info");
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(getEventbyId(id));
        }
    }, [id, dispatch]);


    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section && mainContentRef.current) {
            const containerTop = mainContentRef.current.getBoundingClientRect().top;
            const sectionTop = section.getBoundingClientRect().top;
            const scrollOffset = sectionTop - containerTop + mainContentRef.current.scrollTop - 20;

            mainContentRef.current.scrollTo({
                top: scrollOffset,
                behavior: 'smooth',
            });

            setActiveSection(sectionId);
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <p>Loading event...</p>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <p>Error: {error}</p>
                <Footer />
            </>
        );
    }

    if (!selectedEvent || Object.keys(selectedEvent).length === 0) {
        return (
            <>
                <Header />
                <p>No event found.</p>
                <Footer />
            </>
        );
    }

    const formattedDate = selectedEvent.eventDate
        ? new Date(selectedEvent.eventDate).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "";

    let descriptionArray = [];
    if (Array.isArray(selectedEvent.description)) {
        descriptionArray = selectedEvent.description;
    } else if (selectedEvent.description) {
        descriptionArray = selectedEvent.description.split("\n"); // split string into paragraphs
    }

    return (
        <>
            <Header />
            <div className={styles['event-detail-container']}>
                <aside className={styles['event-sidebar-left']}>
                    <ul>
                        <li
                            className={activeSection === "event-info" ? styles.active : ""}
                            onClick={() => scrollToSection("event-info")}
                        >
                            <FaTicketAlt className={styles.icon} /> Event Information
                        </li>
                        <li
                            className={activeSection === "event-venue" ? styles.active : ""}
                            onClick={() => scrollToSection("event-venue")}
                        >
                            <MdLocationOn className={styles.icon} /> Venue
                        </li>
                        <li
                            className={activeSection === "event-gallery" ? styles.active : ""}
                            onClick={() => scrollToSection("event-gallery")}
                        >
                            <FaRegImage className={styles.icon} /> Gallery
                        </li>
                        <li
                            className={activeSection === "event-organizer" ? styles.active : ""}
                            onClick={() => scrollToSection("event-organizer")}
                        >
                            <FaBuilding className={styles.icon} /> Organizer
                        </li>
                    </ul>
                </aside>

                <main className={styles['event-main-content']} ref={mainContentRef}>
                    <section id="event-info" className={styles['event-image-banner']}>
                        <img src={selectedEvent.photos[0]} alt="Banner" />
                        <div className={styles['event-header']}>
                            <div className={styles['event-header-left']}>
                                <h2 className={styles['event-title']}>{selectedEvent.name}</h2>
                                <div className={styles['event-details']}>
                                    <span className={styles['detail-item']}>
                                        <MdCalendarToday className={styles.icon} />
                                        {formattedDate} | {selectedEvent.eventTime} <span className={styles.timezone}>(IST)</span>
                                    </span>
                                    <span className={styles['detail-item']}>
                                        <MdLocationOn className={styles.icon} />
                                        {selectedEvent.city}
                                    </span>
                                </div>
                            </div>
                            <div className={styles['event-header-right']}>
                                <button className={styles['icon-btn']}><FaRegHeart /></button>
                                <button className={styles['icon-btn']}><FaShareAlt /></button>
                            </div>
                        </div>
                    </section>

                    <hr className={styles['header-divider']} />

                    <section id="event-description" className={styles['event-description']}>
                        <div className={styles['info-card']}>
                            <h3 className={styles['info-heading']}>EVENT INFORMATION</h3>
                            {descriptionArray.map((text, index) => {
                                if (!isExpanded && index > 2) return null;
                                return (
                                    <p key={index} className={index === 2 && !isExpanded ? styles['muted-text'] : ""}>
                                        {text}
                                    </p>
                                );
                            })}
                            {descriptionArray.length > 3 && (
                                <div className={styles['read-more-wrapper']}>
                                    <button
                                        type="button"
                                        className={`${styles['read-more-link']} ${isExpanded ? styles['collapse-style'] : ""}`}
                                        onClick={() => setIsExpanded(!isExpanded)}
                                    >
                                        {isExpanded ? "Collapse" : "Read More"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>


                    <section id="event-venue" className={styles['event-venue']}>
                        <h3 className={styles['venue-heading']}>VENUE</h3>
                        <div className={styles['venue-content']}>
                            <div className={styles['venue-text']}>
                                <strong>To Be Announced</strong><br />
                                <span>To Be Announced, {selectedEvent.city}, {selectedEvent.country}</span>
                            </div>
                            <button className={styles['venue-map-btn']}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={styles['venue-map-icon']} viewBox="0 0 24 24" fill="none" stroke="#5C33FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                    <path d="M9 21V11l12-2v10" />
                                    <path d="M9 21L3 17V7l6 4" />
                                    <path d="M15 7V3l6 4" />
                                </svg>
                                View on Maps
                            </button>
                        </div>
                    </section>


                    <section id="event-gallery" className={styles['event-gallery']}>
                        <h3>Gallery</h3>
                        <div className={styles['gallery-grid']}>
                            {Array.isArray(selectedEvent.photos) &&
                                selectedEvent.photos.map((photo, idx) => (
                                    <img
                                        key={idx}
                                        src={photo}
                                        alt={`Gallery ${idx + 1}`}
                                    />
                                ))}
                        </div>
                    </section>


                    <section id="event-organizer" className={styles['event-organizer']}>
                        <div className={styles['organizer-card']}>
                            <div className={styles['organizer-cover']}></div>

                            <div className={styles['organizer-content']}>
                                <div className={styles['organizer-avatar']}></div>
                                <div className={styles['organizer-meta']}>
                                    <h3 className={styles['organizer-name']}>Elements</h3>
                                    <p className={styles['organizer-joined']}>Joined on Feb 5, 2019</p>
                                </div>
                                <div className={styles['organizer-stats']}>
                                    <div>
                                        <strong>4</strong>
                                        <span>Events Organised</span>
                                    </div>
                                    <div>
                                        <strong>15</strong>
                                        <span>Followers</span>
                                    </div>
                                </div>
                                <div className={styles['organizer-actions']}>
                                    <button className={styles['follow-btn']}>
                                        Follow <FaRegHeart />
                                    </button>
                                    <button className={styles['chat-btn']}>
                                        <BiSolidMessageRounded />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>

                <aside className={styles['event-sidebar-right']}>
                    <div className={styles['price-box']}>
                        <h2>{selectedEvent.price}</h2>
                        <button className={styles['book-now']}>BOOK NOW</button>
                    </div>

                    <div className={styles['contact-box']}>
                        <p>Have a question?</p>
                        <p>Send your queries to the event organizer</p>
                        <button className={styles['contact-organizer']}>CONTACT ORGANIZER</button>
                    </div>

                    <div className={styles['host-box']}>
                        <p>Host Virtual Events with Townhall</p>
                        <button className={styles['learn-more']}>LEARN MORE</button>
                    </div>
                </aside>
            </div>
            <Footer />
        </>
    );
};

export default EventDetail;
