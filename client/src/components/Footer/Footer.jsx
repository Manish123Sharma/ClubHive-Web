import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from '../../assets/logo.svg';

const Footer = () => {
    return (
        <footer className="footer">
            {/* Background buildings line */}
            {/* <div className="footer-top-line"></div> */}

            <div className="footer-content">
                {/* Left Section */}
                <div className="footer-left">
                    <div className="footer-logo">
                        <img
                            src={logo}
                            alt="ClubHive Logo"
                        />
                        <p>Copyright@2025</p>
                    </div>

                    <a href="#" className="footer-link">
                        View Your Bookings ↗
                    </a>
                    <p className="footer-subtitle">Organizer App</p>
                    <div className="app-icons">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                            alt="Google Play"
                        />
                        <img
                            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                            alt="App Store"
                        />
                    </div>

                    <p className="footer-subtitle">Follow us on</p>
                    <div className="social-icons">
                        <FaFacebookF />
                        <FaTwitter />
                        <FaInstagram />
                        <FaLinkedinIn />
                    </div>
                </div>

                {/* Middle Sections */}
                <div className="footer-columns">
                    <div>
                        <h4>Learn More</h4>
                        <ul>
                            <li>Pricing</li>
                            <li>How it works</li>
                            <li>Policies</li>
                            <li>Privacy</li>
                            <li>APIs for Developers</li>
                            <li>Support / FAQs</li>
                        </ul>
                        <h4>Popular Cities</h4>
                        <ul className="cities">
                            <li>Singapore</li>
                            <li>Bengaluru</li>
                            <li>Chennai</li>
                            <li>Delhi</li>
                            <li>Hyderabad</li>
                            <li>Mumbai</li>
                            <li>Pune</li>
                            <li>Bali</li>
                            <li>Jakarta</li>
                        </ul>
                    </div>

                    <div>
                        <h4>About</h4>
                        <ul>
                            <li>About us</li>
                            <li>Contact us</li>
                            <li>Blog</li>
                            <li>Event Magazine</li>
                            <li>Product Diary</li>
                            <li>Sitemap</li>
                        </ul>
                    </div>

                    <div>
                        <h4>Organize Events</h4>
                        <ul>
                            <li>Conferences</li>
                            <li>Workshops and Trainings</li>
                            <li>Sports and Fitness Events</li>
                            <li>Entertainment Events</li>
                            <li>Treks and Trips</li>
                        </ul>
                    </div>

                    <div>
                        <h4>Popular Searches</h4>
                        <ul>
                            <li>Countries supported by ClubHive</li>
                            <li>Sell Event Tickets Online</li>
                            <li>Event Management Software</li>
                            <li>Event Registration Software</li>
                            <li>Conference management System</li>
                            <li>Event Planning Software</li>
                        </ul>
                    </div>

                    <div className='contact_cert'>
                        <div className="contact_us">
                            <h4>Compare Us</h4>
                            <ul>
                                <li>Eventbrite</li>
                                <li>Peatix</li>
                                <li>Zoom</li>
                                <li>Skype</li>
                                <li>Go To Meeting</li>
                                <li>Google Meet Alternative</li>
                                <li>WebEx Alternative</li>
                                <li>GoToWebinar Alternative</li>
                            </ul>
                        </div>

                        <div className="footer-certifications">
                            <img
                                src="https://images.g2crowd.com/uploads/report_medal/image/63/medal.svg"
                                alt="SOC 2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
