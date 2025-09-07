import React, { useEffect, useRef, useState } from 'react';
import './FilterBar.css';
import { FaCalendarAlt, FaMoneyBillWave, FaThLarge, FaBars } from "react-icons/fa";

const FilterBar = () => {

    const [openDropdown, setOpenDropdown] = useState(null); // "date" | "price" | null
    const barRef = useRef();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (barRef.current && !barRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="filter-bar" ref={barRef}>
            <div className="filter-left">
                <span className="filter-label">Filter by</span>

                {/* Date Dropdown */}
                <div
                    className={`filter-option ${openDropdown === "date" ? "active" : ""}`}
                    onClick={() => setOpenDropdown(openDropdown === "date" ? null : "date")}
                >
                    <FaCalendarAlt className="filter-icon" />
                    <span>Date</span>
                    <span className={`dropdown-arrow ${openDropdown === "date" ? "open" : ""}`}>
                        ▾
                    </span>

                    {openDropdown === "date" && (
                        <div className="dropdown-menu slide-down">
                            <div className="dropdown-item">Today</div>
                            <div className="dropdown-item">Tomorrow</div>
                            <div className="dropdown-item">This Weekend</div>
                            <div className="dropdown-item">This Month</div>
                        </div>
                    )}
                </div>

                {/* Price Dropdown */}
                <div
                    className={`filter-option ${openDropdown === "price" ? "active" : ""}`}
                    onClick={() => setOpenDropdown(openDropdown === "price" ? null : "price")}
                >
                    <FaMoneyBillWave className="filter-icon" />
                    <span>Price</span>
                    <span className={`dropdown-arrow ${openDropdown === "price" ? "open" : ""}`}>
                        ▾
                    </span>

                    {openDropdown === "price" && (
                        <div className="dropdown-menu slide-down">
                            <div className="dropdown-item">Free</div>
                            <div className="dropdown-item">Paid</div>
                        </div>
                    )}
                </div>
            </div>

            <div className="filter-right">
                <button className="view-toggle">
                    <FaThLarge />
                </button>
                <button className="view-toggle">
                    <FaBars />
                </button>
            </div>
        </div>
    )
}

export default FilterBar
