import React from "react";
import Footer from "../../components/Footer/Footer";
import RecentlyAdded from "../../components/RecentlyAdded/RecentlyAdded";
import FeaturedToday from "../../components/FeaturedToday/FeaturedToday";
import ComingSoon from "../../components/ComingSoon/ComingSoon";
import "./HomePage.css";
import TopUS from "../../components/TopUS/TopUS";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <RecentlyAdded />
            <div className="row">
              <div className="col-12">
                <FeaturedToday />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <TopUS />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <ComingSoon />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
