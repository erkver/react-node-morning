import React, {Component} from "react";
import "./Card.css";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      name: props.character.name,
      species: props.character.species
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
  console.log(this.props);
  return (
    <div className="card-cont">
      <button onClick={() => {this.props.deleteChar(id); this.setState({edit: false})}}>X</button>
      <button onClick={() => this.toggleEdit()}>Edit</button>
      {!this.state.edit 
        ? <div>
            <p>{name}</p>
            <p>{species}</p>
         </div>
        : <form onSubmit={e => { this.props.editChar(e, id, this.state.name, this.state.species); this.setState({ edit: false })}}>
          <input
            value={this.state.name}
            onChange={e => this.handleChange(e)}
            required
            name="name"
            type="text"
          />
          <input
            value={this.state.species}
            onChange={e => this.handleChange(e)}
            required
            name="species"
            type="text"
          />
          <input type="submit" />
        </form>
      }
      <img src={image} alt={name} />
    </div>
  )
}
}

export default Card;