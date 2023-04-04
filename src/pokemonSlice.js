import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPokemon = createAsyncThunk(
  'pokemon/fetchPokemon',
  async (page) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`);
    return response.data;
  }
);

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemonList: [],
    currentPage: 1,
    status: '',
    error: null,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pokemonList = action.payload.results;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage } = pokemonSlice.actions;

export const selectPokemonList = (state) => state.pokemon.pokemonList;
export const selectCurrentPage = (state) => state.pokemon.currentPage;
export const selectStatus = (state) => state.pokemon.status;
export const selectError = (state) => state.pokemon.error;

export default pokemonSlice.reducer;
