import React from 'react'
import './PopularEvent.css'

const PopularEvent = () => {
    return (
        <div className="popular_events_wrapper">
            <div className="popular_even">
                <div className="view_all_panel">
                    <div className="upper_panel">
                        <h1>
                            Popular Events
                        </h1>
                        <a href="#">In India</a>
                    </div>
                    <div className="lower_panel"></div>
                </div>
            </div>
        </div>
    );
}

export default PopularEvent;

