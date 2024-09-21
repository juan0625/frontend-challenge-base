import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Obtener los géneros
  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
      const data = await res.json();
      setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  // Obtener películas por género o búsqueda
  useEffect(() => {
    const fetchMovies = async () => {
      let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US`;
      if (selectedGenre) {
        url += `&with_genres=${selectedGenre}`;
      }
      if (searchTerm) {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=en-US`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, [selectedGenre, searchTerm]);

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>Películas</h1>

      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por título"
        className={styles.search}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Filtro por géneros */}
      <select value={selectedGenre} onChange={handleGenreChange} className={styles.genreFilter}>
        <option value="">Todos los géneros</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <div className={styles.moviesContainer}>
        {movies.map((movie) => (
          <div className={styles.card} key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.movieImage}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
