import React from "react";
import "./Episode.css";

const Card = props => {
  // Destructure values of off props and our episode object
  const { name, episode } = props.episode;
  return (
    <div className="single-ep-cont">
      <p>{name} - {episode}</p>
    </div>
  );
};

export default Card;
