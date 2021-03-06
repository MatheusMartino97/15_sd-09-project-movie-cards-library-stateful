import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);

    const { movies } = this.props;

    this.updateState = this.updateState.bind(this);
    this.filterMovies = this.filterMovies.bind(this);
    this.addMovieCard = this.addMovieCard.bind(this);
    this.validateFields = this.validateFields.bind(this);

    this.state = {
      searchText: '',
      selectedGenre: '',
      // bookmarked: false,
      movies,
    };
  }

  updateState({ target }) {
    const { type, checked, value } = target;
    const valueToBeReturned = type === 'checkbox' ? checked : value;

    this.setState({ [target.name]: valueToBeReturned });
  }

  filterMovies() {
    const { bookmarkedOnly, selectedGenre, searchText, movies } = this.state;
    let filteredMovies = movies;

    if (bookmarkedOnly) {
      filteredMovies = movies.filter((movie) => movie.bookmarked === true);
    }

    if (selectedGenre) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.genre === selectedGenre,
      );
    }

    if (searchText) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.storyline.toUpperCase().includes(searchText.toUpperCase())
          || movie.title.toUpperCase().includes(searchText.toUpperCase())
          || movie.subtitle.toUpperCase().includes(searchText.toUpperCase()),
      );
    }

    return filteredMovies;
  }

  validateFields() {
    const addMovieInputs = document.querySelectorAll('.add-movie-form input, .add-movie-form textarea')
    const values = []

    addMovieInputs.forEach((input) => {
      if (input.type !== 'number') {
        if (input.value) {
          values.push(input.value)
        } else {
          values.push(false)
        }
      }
    })

    return values.includes(false) ? false : true
  }

  addMovieCard(state) {
    this.setState((previousState) => {
      const verifiedMessageSpan = document.querySelector('.verified-message')

      if (this.validateFields() === false) {
        
        verifiedMessageSpan.style.visibility = 'visible'

        return
      }

      verifiedMessageSpan.style.visibility = 'hidden'

      if (
        state.title
        !== previousState.movies[previousState.movies.length - 1].title
        || state.imagePath
        !== previousState.movies[previousState.movies.length - 1].imagePath
      ) {
        return { movies: [...previousState.movies, state] };
      }
    });
  }

  render() {
    const movies = this.filterMovies();
    const { searchText, selectedGenre, bookmarkedOnly } = this.state;

    return (
      <div onChange={ this.filterMovies } className='page'>
        <h2> Movie library </h2>
        <SearchBar
          searchText={ searchText }
          selectedGenre={ selectedGenre }
          bookmarkedOnly={ bookmarkedOnly }
          onSearchTextChange={ this.updateState }
          onBookmarkedChange={ this.updateState }
          onSelectedGenreChange={ this.updateState }
        />
        <MovieList movies={ movies } />
        <AddMovie onClick={ this.addMovieCard } />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf({}).isRequired,
};

export default MovieLibrary;
