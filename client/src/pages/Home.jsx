import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header/Header';
import SliderCard from '../components/Sliders/Slider Cards/SliderCard';
import './styles/Home.css';
import PopularEvent from '../components/Popular Events/PopularEvent';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import { useDispatch } from 'react-redux';
import { getEventbyCity } from '../redux/slices/eventSlics';
import gurgaon from '../assets/Guragaon.jpg';
import delhi from '../assets/Delhi.png';
import banglore from '../assets/Bengaluru.png';
import chennai from '../assets/Chennai.jpg';
import hyderabad from '../assets/Hyderabad.jpg';
import mumbai from '../assets/Mumbai.png';
import pune from '../assets/Pune.jpg';
import ahemdabad from '../assets/Ahmedabad.jpg';
import jaipur from '../assets/Jaipur.jpg';
import kolkata from '../assets/Kolkata.jpg';
import noida from '../assets/Noida.jpg';
import rishikesh from '../assets/Rishikesh.jpg';


const Home = () => {
    const sliderRef = useRef(null);

    const dispatch = useDispatch();
    // const { events, loading } = useSelector((state) => state.events);

    const [eventsByCity, setEventsByCity] = useState({});
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const cities = [
        {
            name: 'Gurgaon',
            pic: gurgaon
        },
        {
            name: 'Delhi',
            pic: delhi
        },
        {
            name: 'Banglore',
            pic: banglore
        },
        {
            name: 'Chennai',
            pic: chennai
        },
        {
            name: 'Hyderabad',
            pic: hyderabad
        },
        {
            name: 'Mumbai',
            pic: mumbai
        }, {
            name: 'Pune',
            pic: pune
        },
        {
            name: 'Ahemdabad',
            pic: ahemdabad
        },
        {
            name: 'Jaipur',
            pic: jaipur
        },
        {
            name: 'Kolkata',
            pic: kolkata
        },
        {
            name: 'Noida',
            pic: noida
        },
        {
            name: 'Rishikesh',
            pic: rishikesh
        }
    ];

    useEffect(() => {
        cities.forEach(async (city) => {
            const action = await dispatch(getEventbyCity(city.name));
            if (getEventbyCity.fulfilled.match(action)) {
                setEventsByCity((prev) => ({
                    ...prev,
                    [city.name]: action.payload, // save array of events
                }));
            }
        });
    }, [dispatch]);

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

    const onclick = () => {
        console.log('Hello');
    }

    return (
        <>
            <Header />
            <div className="slider-wrapper">
                {canScrollLeft && (
                    <button className="arrow left" onClick={() => scroll('left')}>
                        ◀
                    </button>
                )}
                <div className="slider-container" ref={sliderRef}>
                    {cities.map((city, i) => {
                        const events = eventsByCity[city.name] || [];
                        return (
                            <SliderCard
                                key={i}
                                city={city.name}
                                events={events.length} // dynamic count
                                image={city.pic}
                                onClick={onclick}
                            />
                        );
                    })}
                </div>
                {canScrollRight && (
                    <button className="arrow right" onClick={() => scroll('right')}>
                        ▶
                    </button>
                )}
            </div>
            <PopularEvent backgroundColor={'#f7f7f7'} country={'India'} />
            {/* <Banner /> */}
            <PopularEvent backgroundColor={''} city={'Gurgaon'} />
            <Banner />
            <PopularEvent backgroundColor={'#f7f7f7'} city={'Noida'} />
            {/* <Banner /> */}
            <PopularEvent backgroundColor={''} city={'Delhi'} />
            <Footer />
        </>
    );
}

export default Home;
