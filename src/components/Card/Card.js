import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import "./Card.css";

const Card = (props) => {
  // Destructure values of off props and our character object
  const { name, species, image, id } = props.character;
  
  console.log(props.admin);
  return (
    <div className="card-cont">
      {props.admin.isAdmin
        ? <NavLink className="edit-btn" to={`/edit/${id}`}>Edit...</NavLink>
        : <></>
      }
      <div>
        <p>{name}</p>
        <p>{species}</p>
      </div>
      <img src={image} alt={name} />
    </div>
  )
}

export default Card;