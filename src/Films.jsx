import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

const findFilm = gql`
  query getFilmById($filmId: ID) {
    film(id: $filmId) {
      planetConnection {
        planets {
          name
        }
      }
    }
  }
`;

const Films = ({ films }) => {
  const [getFilm, result] = useLazyQuery(findFilm);
  const [film, setFilm] = useState(null);

  const showFilm = (filmId) => {
    getFilm({ variables: { filmId } });
  };

  useEffect(() => {
    if (result.data) setFilm(result.data.film);
  }, [result]);

  if (film)
    return (
      <div>
        <h2>Planets</h2>
        {film.planetConnection.planets.map((planet) => (
          <p>{planet.name}</p>
        ))}
        <button onClick={() => setFilm(null)}>Close</button>
      </div>
    );

  if (films === null) return null;
  return (
    <div>
      <h2>Films</h2>
      {films.map((film) => (
        <div
          key={film.id}
          style={{ cursor: 'pointer' }}
          onClick={() => showFilm(film.id)}
        >
          <p>{`${film.title}, ${film.director}`}</p>
        </div>
      ))}
    </div>
  );
};

export default Films;
