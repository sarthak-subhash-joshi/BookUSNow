import React, { useState, useEffect, useRef } from "react";
import "../styles/components/UpcommingEvents.css";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import PacmanLoader from "react-spinners/PacmanLoader";
import AOS from "aos";
import "aos/dist/aos.css";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // To track if there are more pages to load
  const loaderRef = useRef(null); // Reference to the hidden loader div (Having a div at end to check whether we reached end or not)

  useEffect(() => {
    AOS.init({
      duration: 900, 
      easing: "ease-in-out", 
      once: false
    });
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [page]);

  

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&page=${page}&type=upcoming`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      if (page === 6) {
        setHasMore(false); // No more events to load
      } else {
        setEvents((prevEvents) => [...prevEvents, ...data.events]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(error.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading && page<=5 ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [loaderRef, hasMore, loading]);

  // Function to extract the file ID from the Google Drive URL
  const getDriveFileId = (url) => {
    const splitUrl = url.split('/');
    return splitUrl[splitUrl.length - 2];
  };

  return (
    <>
      <div className="upcomingEventsContainer">
        <h4 className="eventHeading">
          Upcoming Events <FaArrowRight />
        </h4>
        <div className="row" >
          {events.map((event, index) => (
            <div className="col-lg-4 mb-4" key={index} data-aos="fade-up">
              <div className="eventCard" style={{ width: "100%" }}>
                <img
                  src={`https://drive.google.com/thumbnail?id=${getDriveFileId(event.imgUrl)}`}
                  className="cardImgTop"
                  alt="Event Thumbnail"
                />
                 <p className="upcommingEventDate">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                <div className="cardBody">
                  <h5 className="cardHeading">{event.eventName}</h5>
                  <div className="cardText">
                    <p>
                      <FaMapMarkerAlt style={{ fontSize: "large" }} /> {event.cityName}
                    </p>
                    <p>{event.weather.split(' ').join(', ')} | {(event.distanceKm / 1000).toFixed(1)} Km</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div ref={loaderRef} style={{ visibility: "hidden" }} />
        {loading &&<>
          <p style={{color:'#B0BABF'}}>Loading</p>
          <PacmanLoader color="#36d7b7" />
        </>
        }
        {/* {error && <p>{error}</p>} */}
      </div>
    </>
  );
};

export default UpcomingEvents;
