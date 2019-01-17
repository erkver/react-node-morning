import React from "react";
import "./Card.css";

const Card = props => {
  // Destructure values of off props and our character object
  const { name, species, image } = props.character;
  return (
    <div className="card-cont">
      <p>{name}</p>
      <p>{species}</p>
      <img src={image} alt={name} />
    </div>
  )
}

export default Card;