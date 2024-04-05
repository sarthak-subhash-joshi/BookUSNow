import React from "react";
import "../styles/components/Navbar.css";
import { FaSearch,FaBars, FaHeart, FaUser,FaMapMarkerAlt, FaAngleRight } from "react-icons/fa";

const Navbar = () => {
  return (
    <>
      <div className="navbarContainerOutside align-items-start">
       <div>
       <h5 className="brandName">BookUsNow</h5>
       <p className="locationShortScreen"><FaMapMarkerAlt style={{ color: '#989090',fontSize:'x-large' }} /> Mumbai, India    <FaAngleRight style={{ color: 'gray' }}  /> </p>
       </div>
         <div className="headerContainer">
          <button type="button" class="categoriesContainer btn btn-dark">
          <FaBars />
          <span style={{marginLeft:'5px'}}> Categories</span>
          </button>
        <div className="searchBar">
          <input type="text" placeholder="Search..." className="searchInput" />
          <FaSearch className="searchIcon" />
        </div>
         </div>
       <div>
       <button type="button" class=" searchIconButtonShortScreen btn btn-light"><FaSearch /></button>
       <button type="button" class=" favoriteButton btn btn-light"> <FaHeart style={{ color: '#989090' }} /> <span className="buttonLabel">Favorites</span></button>
        <button type="button" class=" signInButton btn btn-light">  <FaUser style={{ color: '#989090' }}/> <span  className="buttonLabel"> Sign In</span></button>
       </div>
      </div>


      <div className="containerLocationAndShowsOutside">
        <p className="locationLargeScreen col-lg-4"><FaMapMarkerAlt style={{ color: '#989090',fontSize:'x-large' }} /> Mumbai, India    <FaAngleRight style={{ color: 'gray' }}  /></p>
        <div className="categoryTagsContainer col-lg-6">
          <span className="categoryTag">Live Shows</span>
          <span  className="categoryTag">Streams</span>
          <span  className="categoryTag">Movies</span>
          <span  className="categoryTag">Plays</span>
          <span  className="categoryTag">Events</span>
          <span  className="categoryTag">Sports</span>
          <span  className="categoryTag">Activities</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
