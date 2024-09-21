import { useEffect, useState } from 'react';
import { fetchGenres } from '../utils/tmdb';

const GenreFilter = ({ onGenreSelect }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      const genreList = await fetchGenres();
      setGenres(genreList);
    };
    getGenres();
  }, []);

  return (
    <div>
      <select onChange={(e) => onGenreSelect(e.target.value)}>
        <option value="">Selecciona un género</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
