import logo from './logo.svg';
import './App.css';
import { gql, useQuery } from '@apollo/client';

const allFilms = gql`
  query {
    allFilms {
      films {
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
  const result = useQuery(allFilms);
  console.log(result);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>GraphQL + React</p>
      </header>
    </div>
  );
}

export default App;
