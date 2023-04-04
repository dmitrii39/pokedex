import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { openModal } from "./modalSlice";
import {
  fetchPokemon,
  selectPokemonList,
  selectCurrentPage,
  setCurrentPage,
  selectStatus,
  selectError,
} from "./pokemonSlice";
import Modal from "./Modal";
function App() {
  const pokemonList = useSelector(selectPokemonList);
  const currentPage = useSelector(selectCurrentPage);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("");

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchPokemon(currentPage));
  }, [dispatch, currentPage]);

  function handlePrevPage() {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  }

  function handleNextPage() {
    dispatch(setCurrentPage(currentPage + 1));
  }

  function handlePokemonClick(pokemonUrl) {
    axios.get(pokemonUrl).then((response) => {
      dispatch(openModal(response.data));
    });
  }

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10 flex flex-wrap justify-center gap-4">
        <h1 className="text-4xl text-red-500">Pokemon List</h1>
        <input
          className="bg-gray-100 py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          type="text"
          value={filter}
          onChange={handleFilterChange}
        />
        {status === "loading" && <div>Loading...</div>}
        {status === "failed" && <div>{error}</div>}
        {filteredPokemonList.map((pokemon) => (
          <div
            className="bg-white shadow-md rounded-lg p-4 text-center cursor-pointer font-bold"
            key={pokemon.name}
            onClick={() => handlePokemonClick(pokemon.url)}
          >
            {pokemon.name}
          </div>
        ))}
        <div className="w-full flex justify-center mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handlePrevPage}
          >
            Prev
          </button>
          <span className="text-xl">{currentPage}</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
      <Modal />
    </>
  );
}

export default App;
