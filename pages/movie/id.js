import { fetchMovieDetails } from '../../utils/tmdb';

const MovieDetails = ({ movie }) => {
  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average}</p>
    </div>
  );
};

export const getStaticPaths = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  
  const paths = data.results.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const movie = await fetchMovieDetails(params.id);
  return {
    props: {
      movie,
    },
  };
};

export default MovieDetails;
