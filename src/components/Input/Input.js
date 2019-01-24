import React,{ Component } from "react";
import axios from "axios";

class Input extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      species: "",
      url: ""
    }
  }


  componentDidMount() {
    console.log(this.props.match.path.includes("edit"));
    if(this.props.match.path.includes('edit')) {
      axios.get(`/api/characters/${this.props.match.params.id}`).then(res => {
        console.log(res)
        this.setState({name: res.data.name, species: res.data.species, url: res.data.image_url})
      })
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <form>
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
      </div>
    )
  }
}

export default Input;