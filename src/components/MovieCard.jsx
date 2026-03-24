import React from "react";

export const MovieCard = ({
  movie: { title, poster_path, release_date, original_language, vote_average },
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "../public/no-movie.jpg"
        }
        alt={title}
      />

      <div className="mt-4">
        <h3>{title}</h3>
      </div>

      <div className="content">
        <div className="rating">
          <img src="star.svg" alt="Star Icon" />
          <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
        </div>

        <span>•</span>
        <p className="lang">{original_language}</p>
        <span>•</span>
        <p className="year">
          {release_date ? release_date.split("-")[0] : "N/A"}
        </p>
      </div>
    </div>
  );
};
