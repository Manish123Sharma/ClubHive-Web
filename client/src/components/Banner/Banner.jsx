import React from 'react';
import './Banner.css';
import logo from '../../assets/logo.svg';

const Banner = () => {
    return (
        <div className="banner">
            <div className="banner-content">
                {/* Left side text */}
                <div className="banner-text">
                    <img
                        src={logo}
                        alt="clubhive logo"
                        className="banner-logo"
                        
                    />
                    <h2>Interested in hosting a virtual conference?</h2>
                    <p>
                        Introducing Townhall (A Townscript Company) - an all-in-one platform for
                        virtual events of any size and type.
                    </p>
                    <button className="banner-btn">Know more</button>
                </div>

                {/* Right side image */}
                <div className="banner-image">
                    <img src='https://www.topgear.com/sites/default/files/2025/01/1-Defender-Octa-review-2025.jpg?w=976&h=549' alt="Virtual Conference" />
                </div>
            </div>
        </div>
    );
}

export default Banner;
