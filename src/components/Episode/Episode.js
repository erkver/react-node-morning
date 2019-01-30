import React,{ Component } from "react";
import "./Episode.css";
import axios from "axios";
import Header from "../Header/Header";

class Episode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: []
    }
  }

  componentDidMount() {
    axios.get('/api/episodes').then(res => {
      this.setState({episodes: res.data})
    }).catch(err => console.log(err));
  } 

  render() {
    let episodeList = this.state.episodes.map((ep, i) => (
      <div className="ep-cont" key={i}>
        <p>
          {ep.name} - {ep.episode}
        </p>
      </div>
    ));
    return (
      <div className="single-ep-cont">
        <Header />
        {episodeList}
      </div>
    )
  }
};

export default Episode;
