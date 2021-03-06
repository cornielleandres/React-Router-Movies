import React, { Component } from 'react';
import axios from 'axios';

import MovieCard from './MovieCard';

import './Movie.css';

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL
    const id = this.props.match.params.id;

    this.fetchMovie(id);
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        this.setState(() => ({ movie: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };
  // Uncomment this code when you're ready for the stretch problems
  // componentWillReceiveProps(newProps){
  //   if(this.props.match.params.id !== newProps.match.params.id){
  //     this.fetchMovie(newProps.match.params.id);
  //   }
  // }

  // Because componentWillReceiveProps() is deprecated, I instead
  // used componentDidUpdate()
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchMovie(this.props.match.params.id);
    }
  }

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    
    addToSavedList(this.state.movie);
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <div className="movie-card">
          <MovieCard movie = { this.state.movie } />
        </div>
        <div 
          className="save-button" 
          onClick = { this.saveMovie } 
        >Save</div>
      </div>
    );
  }
}
