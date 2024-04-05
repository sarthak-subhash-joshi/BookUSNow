import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import "../styles/pages/Home.css";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import UpcommingEvents from "../components/UpcommingEvents";
import HorizontalScroller from "../components/HorizontalScroller";

const Home = () => {
  return (
    <>

      <Navbar />
      <div className="bannerContainer">
        <div className="backgroundImage" />
        <div className="contentOverlay">
          <div className="content">
            <h1>
              Discover Exciting Events Happening Near You - Stay Tuned for
              Updates!
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit
              suscipit ab accusantium vero unde veniam, ducimus debitis ipsum
              provident velit quos sequi aliquam maxime dicta?
            </p>
          </div>
        </div>
      </div>

      <HorizontalScroller />

      <UpcommingEvents />
    </>
  );
};

export default Home;
