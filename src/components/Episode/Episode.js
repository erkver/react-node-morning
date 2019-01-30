import React,{ Component } from "react";
import "./Episode.css";
import axios from "axios";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { getEpisodes } from "../../ducks/epReducer";

class Episode extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     episodes: []
  //   }
  // }

  componentDidMount() {
    // axios.get('/api/episodes').then(res => {
    //   this.setState({episodes: res.data})
    // }).catch(err => console.log(err));

    this.props.getEpisodes();
  } 

  render() {
    console.log(this.props);
    let episodeList = this.props.episodes.map(
      (ep, i) => (
        <div className="ep-cont" key={i}>
          <p>
            {ep.name} - {ep.episode}
          </p>
        </div>
      )
    );
    return (
      <div className="single-ep-cont">
        <Header />
        {!this.props.episodes[0] 
          ? <h1>Loading...</h1>
          : episodeList
        }
      </div>
    )
  }
};

const mapStateToProps = state => {
  const { episodes } = state.epReducer;
  return { episodes };
}

export default connect(mapStateToProps, { getEpisodes })(Episode);
