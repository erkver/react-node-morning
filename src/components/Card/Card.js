import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./Card.css";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.character.name,
      species: props.character.species,
      edit: false
    }
  }

  // This will update our input to reflect the correct name and species. When deleting character and this.state.edit set to true, the previous characters inherits the next characters name and speices. This updates our props to reflect the correct character.
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.character.name !== this.props.character.name || prevProps.character.species !== this.props.character.species) {
      this.setState({ name: this.props.character.name, species: this.props.character.species});
    } 
  } 

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
  // Destructure values of off props and our character object
  const { name, species, image, id } = this.props.character;
  // console.log(this.props);
  return (
    <div className="card-cont">
      <button onClick={() => {this.props.deleteChar(id); this.setState({edit: false})}}>X</button>
      <button onClick={() => this.toggleEdit()}>Edit</button>
      {!this.state.edit 
        ?
        <div>
          <p>{name}</p>
          <p>{species}</p>
        </div>
        : 
        <form className="edit-form" onSubmit={e => {this.props.editChar(e, id, this.state.name, this.state.species); this.setState({edit: false})}}>
          <input
            type="text"
            onChange={e => this.setState({name: e.target.value})}
            required
            value={this.state.name} 
          />
          <input
            type="text"
            onChange={e => this.setState({species: e.target.value})}
            required
            value={this.state.species} 
          />
          <input type="submit" name="Submit" />
        </form>
      }
      <img src={image} alt={name} />
    </div>
  )}
}

export default Card;