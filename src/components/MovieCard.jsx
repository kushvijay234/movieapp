import React from "react";

const MovieCard = ({ movie }) => {
  const { title, name, year, source_release_date, type, poster_url,image_url } = movie;
  const image = poster_url || image_url;
  const displayTitle = title || name || "Untitled";
  const date = year || source_release_date;
  return (
    <div className="movie-card">
      <img
        src={image ?
          `${image}` : './no-poster-lsc.png'}
        alt={displayTitle}
      />
      <div className="mt-4">
        <h3>{displayTitle}</h3>
        <div className="content">
          <h5 className="text-white">Release Date: {date}, </h5>
          <p className="text-white">{type}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
