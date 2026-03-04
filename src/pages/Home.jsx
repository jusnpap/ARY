import React from 'react';
import HomeText from '../components/home/HomeText';
import HomeTarget from '../components/home/HomeTarget';
import Hero from '../components/home/Hero';
import Homewe from '../components/home/Homewe';
import Homeads from '../components/home/Homeads';

const Home = () => {
    return (
        <div className="herosection">
                <Hero />
            <div className="container">
                <><Homeads /> <HomeText /> <HomeTarget/> <Homewe/></>
            </div>
        </div>
    );
};

export default Home;