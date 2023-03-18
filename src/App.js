import logo from './logo.svg';
import './App.css';
import { gql, useQuery } from '@apollo/client';
import Films from './Films';

const allFilms = gql`
  query {
    allFilms {
      films {
        id
        title
        director
        releaseDate
        speciesConnection {
          species {
            name
            classification
            homeworld {
              name
            }
          }
        }
      }
    }
  }
`;

function App() {
  const { data, error, loading } = useQuery(allFilms);

  if (error) return <span style={{ color: 'red' }}>{error}</span>;
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>GraphQL + React</p>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <Films films={data.allFilms.films} />
        )}
      </header>
    </div>
  );
}

export default App;
