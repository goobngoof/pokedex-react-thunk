import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import PokemonDetail from './PokemonDetail';
import CreatePokemonForm from './CreatePokemonForm';
import Fab from './Fab';
import { getPokemon } from '../store/pokemon';

const PokemonBrowser = () => {
  let dispatch = useDispatch();
  const { pokemonId } = useParams();
  const pokemon = useSelector(state => {
    return state.pokemon.list.map(pokemonId => state.pokemon[pokemonId]);
  });
  const [showForm, setShowForm] = useState(false);

  // Phase 1 -
  // Dispatch the thunk action returned by the getPokemon() thunk action creator
  // after this component first renders (i.e. 2nd argument of useEffect is [])
  useEffect(() => {
    dispatch(getPokemon());
  }, []);

  if (!pokemon) {
    return null;
  }

  return (
    <main>
      <nav>
        <Fab hidden={showForm} onClick={() => setShowForm(true)} />
        {pokemon.map((pokemon) => {
          return (
            <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
              <div
                className={
                  Number.parseInt(pokemonId) === pokemon.id
                    ? "nav-entry is-selected"
                    : "nav-entry"
                }
              >
                <div
                  className="nav-entry-image"
                  style={{ backgroundImage: `url('${pokemon.imageUrl}')` }}
                ></div>
                <div>
                  <div className="primary-text">{pokemon.name}</div>
                  <div className="secondary-text">
                    {pokemon.number} {pokemon.captured && "(Captured)"}
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </nav>
      {showForm ? (
        <CreatePokemonForm hideForm={() => setShowForm(false)} />
      ) : (
        <Route path="/pokemon/:pokemonId">
          <PokemonDetail />
        </Route>
      )}
    </main>
  );
};

export default PokemonBrowser;
