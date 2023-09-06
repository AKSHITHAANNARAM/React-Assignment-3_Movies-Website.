import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      query: '', // Add a state for the search query
      errorMessage: '', // Add a state for the error message
      movieQuotes: [  // Add a list of movie quotes
        {
          quote: "May the Force be with you.",
          movie: "Star Wars",
          character: "Various",
        },
        {
          quote: "Here's looking at you, kid.",
          movie: "Casablanca",
          character: "Rick Blaine",
        },
        {
            quote: "You can't handle the truth!",
            movie: "A Few Good Men",
            character: "Colonel Jessup",
          },
          {
            quote: "Life is like a box of chocolates.",
            movie: "Forrest Gump",
            character: "Forrest Gump",
          },
          {
            quote: "There's no place like home.",
            movie: "The Wizard of Oz",
            character: "Dorothy",
          },
          {
            quote: "To infinity and beyond!",
            movie: "Toy Story",
            character: "Buzz Lightyear",
          },
          {
            quote: "Here's Johnny!",
            movie: "The Shining",
            character: "Jack Torrance",
          },
          {
            quote: "I'll be back.",
            movie: "The Terminator",
            character: "The Terminator",
          },
          {
            quote: "You talking to me?",
            movie: "Taxi Driver",
            character: "Travis Bickle",
          },
          {
            quote: "Bond. James Bond.",
            movie: "Dr. No",
            character: "James Bond",
          },
          {
            quote: "Here's my ticket. Don't tear it.",
            movie: "Willy Wonka & the Chocolate Factory",
            character: "Willy Wonka",
          },
          {
            quote: "May the odds be ever in your favor.",
            movie: "The Hunger Games",
            character: "Effie Trinket",
          },
          {
            quote: "Why so serious?",
            movie: "The Dark Knight",
            character: "The Joker",
          },
          {
            quote: "Keep your friends close, but your enemies closer.",
            movie: "The Godfather Part II",
            character: "Michael Corleone",
          },
          {
            quote: "You can't handle my undivided attention.",
            movie: "The Social Network",
            character: "Mark Zuckerberg",
          },
          {
            quote: "I feel the need... the need for speed.",
            movie: "Top Gun",
            character: "Maverick",
          },
          {
            quote: "You can't handle the truth!",
            movie: "A Few Good Men",
            character: "Colonel Jessup",
          },
          {
            quote: "Life is like a box of chocolates.",
            movie: "Forrest Gump",
            character: "Forrest Gump",
          },
          {
            quote: "There's no place like home.",
            movie: "The Wizard of Oz",
            character: "Dorothy",
          },
          {
            quote: "To infinity and beyond!",
            movie: "Toy Story",
            character: "Buzz Lightyear",
          },
          {
            quote: "Here's Johnny!",
            movie: "The Shining",
            character: "Jack Torrance",
          },
          {
            quote: "I'll be back.",
            movie: "The Terminator",
            character: "The Terminator",
          },
          {
            quote: "You talking to me?",
            movie: "Taxi Driver",
            character: "Travis Bickle",
          },
          {
            quote: "Bond. James Bond.",
            movie: "Dr. No",
            character: "James Bond",
          },
          {
            quote: "Here's my ticket. Don't tear it.",
            movie: "Willy Wonka & the Chocolate Factory",
            character: "Willy Wonka",
          },
          {
            quote: "May the odds be ever in your favor.",
            movie: "The Hunger Games",
            character: "Effie Trinket",
          },
          {
            quote: "Why so serious?",
            movie: "The Dark Knight",
            character: "The Joker",
          },
          {
            quote: "Keep your friends close, but your enemies closer.",
            movie: "The Godfather Part II",
            character: "Michael Corleone",
          },
          {
            quote: "You can't handle my undivided attention.",
            movie: "The Social Network",
            character: "Mark Zuckerberg",
          },
          {
            quote: "I feel the need... the need for speed.",
            movie: "Top Gun",
            character: "Maverick",
          },
        ],
      };
// intialize debouncedSearch in the constructor
    this.debouncedSearch = this.debounce(this.handleSearch, 300); // Adjust delay as needed
}

  componentDidMount() {
    // Fetch data when the component mounts
    fetch('https://www.omdbapi.com/?apikey=45f0782a&s=war')
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          this.setState({ movies: data.Search });
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }
  debounce = (func, delay) => {
    let timer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };

  handleInputChange = (event) => {
    const query = event.target.value;
    this.setState({ query });
    this.debouncedSearch(query);
  };

  debouncedSearch = this.debounce(this.handleSearch, 300); // Adjust delay as needed

  handleSearch = (query) => {
    if (query.trim() === '') {
      this.setState({ movies: [], errorMessage: '' });
    } else {
      fetch(`https://www.omdbapi.com/?apikey=45f0782a&s=${query}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.Search) {
            this.setState({ movies: data.Search, errorMessage: '' });
          } else {
            this.setState({ movies: [], errorMessage: 'No movies found.' });
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          this.setState({ movies: [], errorMessage: 'An error occurred.' });
        });
    }
  };

render() {
    const { movies, query, errorMessage, movieQuotes } = this.state;

    return (
      <div className="App">
        <header>
          <h1>🍿Movie Mania Hub!!🎥</h1>
        </header>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={this.handleInputChange}
            />
            <button onClick={() => this.handleSearch(query)}>Search</button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="movie-list">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} />
              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="movie-quotes-marquee">
          <h2>🎬 Famous Movie Quotes 🍿</h2>
          <div className="marquee-container">
            {movieQuotes.map((quote, index) => (
              <div className="marquee-item" key={index}>
                <p className="quote-text">"{quote.quote}"</p>
                <p className="quote-movie">Movie: {quote.movie}</p>
                <p className="quote-character">Character: {quote.character}</p>
              </div>
            ))}
          </div>
        </div>
        <footer>
          &copy;🎬Cinematic Universe {new Date().getFullYear()} From AKSHITHA🌟<br />🎧Your Gateway to Movie Magic!!📺
        </footer>
      </div>
    );
  }
}

export default App;
