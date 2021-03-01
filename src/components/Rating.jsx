import React from 'react';
import PropTypes from 'prop-types';

class Rating extends React.Component {
  render() {
    const { rating } = this.props;
    return (
      <div className="movie-card-rating" data-testid="rating">
        <div className='favorite-star-control'>
        <span className='favorite-star'>
          <img className='favorite-star-icon' src="https://cdn1.iconfinder.com/data/icons/essentials-crafticons/48/Essentials_start_favourite_popular_rate_favorite-512.png" alt=""/>
        </span>
        </div>

        <span className="rating">{rating}</span>
      </div>
    );
  }
}

Rating.propTypes = { rating: PropTypes.number };

Rating.defaultProps = {
  rating: 'undefined',
};

export default Rating;
