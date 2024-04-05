import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { FaArrowRight,FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/components/HorizontalScroller.css'

const HorizontalScroller = () => {

  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    if (isFetchingRef.current) return; // Prevent multiple simultaneous requests
    isFetchingRef.current = true;
    setLoading(true);
    try {
      const response = await axios.get(`https://gg-backend-assignment.azurewebsites.net/api/Events?code=FOX643kbHEAkyPbdd8nwNLkekHcL4z0hzWBGCd64Ur7mAzFuRCHeyQ==&type=reco&page=${page}`);
      const newData = response.data.events;
      setEvents(prevEvents => [...prevEvents, ...newData]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container && container.scrollLeft + container.clientWidth === container.scrollWidth) {
      fetchData(); // Fetch more data when scrolled to the end
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [containerRef]);

  
// Function to extract the file ID from the Google Drive URL
const getDriveFileId = (url) => {
  const splitUrl = url.split('/');
  return splitUrl[splitUrl.length - 2];
};

  return (
   <>
 <div className="recommendedEvents">
        <div className="recommendedEventsHeader">
        <h4>Recommended Shows <FaArrowRight /></h4>
        <p style={{borderBottom:'2px solid',marginRight:'40px',cursor:'pointer'}}>See all</p>
        </div>
        <div className="scrollableEvents">
          {events.map(event => (
            <div key={event.eventName} className="event">
              <img className='eventImage' src={`https://drive.google.com/thumbnail?id=${getDriveFileId(event.imgUrl)}`} alt={event.eventName} />
              <div className="eventDetails">
                <div className="row">
                <p className="eventName col-lg-6 col-md-6 col-sm-6 text-left">{event.eventName}</p>
                <p className="eventDate col-lg-6 col-md-6 col-sm-6">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div className="row">
                <p className="eventCity col-lg-6 col-md-6 col-sm-6 text-right"><FaMapMarkerAlt/> {event.cityName}</p>
                <p className="eventWeather col-lg-6 col-md-6 col-sm-6">{event.weather} | {(event.distanceKm / 1000).toFixed(1)} Km</p>
              
                </div>
                </div>
            </div>
          ))}
        </div>
      </div>
   </>
  )
}

export default HorizontalScroller