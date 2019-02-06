import React,{ Component } from "react";
import { connect } from "react-redux";
import { handleChange } from "../../ducks/charReducer";
import axios from "axios";
import Header from "../Header/Header";
import "./Form.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      species: this.props.species,
      url: this.props.url,
      edit: false
    }
  }


  componentDidMount() {
    if(this.props.match.path.includes('edit')) {
      axios.get(`/api/characters/${this.props.match.params.id}`).then(res => {
        console.log(res);
        this.setState({name: res.data[0].name, species: res.data[0].species, url: res.data[0].image, edit: true})
      })
    }
    if(!this.props.user.isAdmin) {
      this.props.history.push('/');
    }
  }

  addCharacter = (e, name, species, url) => {
    e.preventDefault();
    axios
      .post('/api/characters', {name, species, url})
      .then(res => this.props.history.push('/'))
      .catch(err => console.log(err));
  }

  editCharacter = (e, id, name, species) => {
    e.preventDefault();
    axios.put(`/api/characters/${id}`, { name, species }).then(res => {
      console.log(res);
      this.setState({ characters: res.data })
    });
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    const { edit, name, species, url } = this.state;
    const { handleChange,} = this.props;
    const { id } = this.props.match.params;
    return (
      <div>
        <Header />
        <h1>{edit ? "Edit Character" : "Create Character"}</h1>
        {edit 
          ? <img src={url} alt="" />
          : <></>
        }
        <form className="form-cont" 
          onSubmit={e => {edit 
            ? this.editCharacter(e, id, name, species) 
            : this.addCharacter(e, name, species, url)}}>
          <label>Name:</label>
          <input
            value={name}
            onChange={e => handleChange(e.target.name, e.target.value)}
            required
            name="name"
            type="text"
          />
          <label>Species:</label>
          <input
            value={species}
            onChange={e => handleChange(e.target.name, e.target.value)}
            required
            name="species"
            type="text"
          />
          <label>Image URL:</label>
          <input
            value={url}
            onChange={e => handleChange(e.target.name, e.target.value)}
            required
            name="url"
            type="text"
          />
          <input className="submit-btn" type="submit" />
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { name, species, url } = state.charReducer;
  const { user } = state.userReducer
  return { name, species, url, user };
}

export default connect(mapStateToProps, {handleChange})(Form);