import React from 'react';
import './styles/ViewAllEvents.css';
import FilterBar from '../components/Filter/FilterBar';
import Header from '../components/Header/Header';

const ViewAllEvents = () => {
    return (
        <div className="view-events-page">
            <Header />
            <FilterBar />
        </div>
    );
}

export default ViewAllEvents;
