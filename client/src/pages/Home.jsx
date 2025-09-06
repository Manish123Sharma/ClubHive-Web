import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header/Header';
import SliderCard from '../components/Sliders/Slider Cards/SliderCard';
import './styles/Home.css';
import PopularEvent from '../components/Popular Events/PopularEvent';

const Home = () => {
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
                    {[...Array(10)].map((_, i) => (
                        <SliderCard
                            key={i}
                            city={'Gurgaon'}
                            events={173}
                            image={'https://www.topgear.com/sites/default/files/2025/01/1-Defender-Octa-review-2025.jpg?w=976&h=549'}
                            onClick={onclick}
                        />
                    ))}
                </div>
                {canScrollRight && (
                    <button className="arrow right" onClick={() => scroll('right')}>
                        ▶
                    </button>
                )}
            </div>
            <PopularEvent />
        </>
    );
}

export default Home;
