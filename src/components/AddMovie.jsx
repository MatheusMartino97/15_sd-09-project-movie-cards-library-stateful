import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddMovie extends Component {
  constructor(props) {
    super(props);

    this.updateState = this.updateState.bind(this);
    this.resetState = this.resetState.bind(this);
    this.titleElement = this.titleElement.bind(this);
    this.subtitleElement = this.subtitleElement.bind(this);
    this.imageElement = this.imageElement.bind(this);
    this.storylineElement = this.storylineElement.bind(this);
    this.ratingElement = this.ratingElement.bind(this);
    this.genreElement = this.genreElement.bind(this);

    this.state = {
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    };
  }

  updateState({ target }) {
    const { name, value } = target;

    this.setState({ [name]: value });
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

  resetState() {
    if (this.validateFields() === false) {
      return
    }

    const { onClick } = this.props;
    onClick(this.state);

    this.setState({
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    });
  }

  titleElement() {
    const { title } = this.state;

    return (
      <label htmlFor="title-input" data-testid="title-input-label">
        Título
        <br/>
        <input
          name="title"
          type="text"
          id="title-input"
          data-testid="title-input"
          value={ title }
          onChange={ this.updateState }
        />
      </label>
    );
  }

  subtitleElement() {
    const { subtitle } = this.state;
    return (
      <label htmlFor="subtitle-input" data-testid="subtitle-input-label">
        Subtítulo
        <br/>
        <input
          name="subtitle"
          value={ subtitle }
          type="text"
          id="subtitle-input"
          data-testid="subtitle-input"
          onChange={ this.updateState }
        />
      </label>
    );
  }

  imageElement() {
    const { imagePath } = this.state
    return (
      <label htmlFor="image-input" data-testid="image-input-label">
        Imagem
        <br/>
        <input
          name="imagePath"
          value={ imagePath }
          type="text"
          data-testid="image-input"
          onChange={ this.updateState }
        />
      </label>
    );
  }

  storylineElement() {
    const { storyline } = this.state;
    return (
      <label htmlFor="storyline-input" data-testid="storyline-input-label">
        Sinopse
        <br/>
        <textarea
          name="storyline"
          id="storyline-input"
          data-testid="storyline-input"
          onChange={ this.updateState }
          value={ storyline }
        />
      </label>
    );
  }

  ratingElement() {
    const { rating } = this.state;
    return (
      <label htmlFor="rating-input" data-testid="rating-input-label">
        Avaliação
        <br/>
        <input
          type="number"
          name="rating"
          id="rating-input"
          data-testid="rating-input"
          onChange={ this.updateState }
          value={ rating }
          max='5'
          min='0'
          step='0.1'
        />
      </label>
    );
  }

  genreElement() {
    const { genre } = this.state;

    return (
      <label htmlFor="genre-input" data-testid="genre-input-label">
        Gênero
        <br/>
        <select
          name="genre"
          id="genre-input"
          data-testid="genre-input"
          value={ genre }
          onChange={ this.updateState }
        >
          <option data-testid="genre-option" value="action">
            Ação
          </option>
          <option data-testid="genre-option" value="comedy">
            Comédia
          </option>
          <option data-testid="genre-option" value="thriller">
            Suspense
          </option>
        </select>
      </label>
    );
  }

  render() {
    return (
      <form action="" data-testid="add-movie-form" className='add-movie-form'>
        { this.titleElement() }
        { this.subtitleElement() }
        { this.imageElement() }
        { this.storylineElement() }
        { this.ratingElement() }
        { this.genreElement() }
        <div>
        <button
        className='add-button'
          data-testid="send-button"
          type="button"
          onClick={ () => {
            const { onClick } = this.props;

            this.resetState();
            onClick(this.state);
          } }
        >
          Adicionar filme
        </button>
        <span className='verified-message'><em>Invalid movie</em></span>
        </div>

      </form>
    );
  }
}

AddMovie.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddMovie;
