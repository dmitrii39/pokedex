import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonSlice';
import modalReducer from './modalSlice';
export const store =  configureStore({
  reducer: {
    pokemon: pokemonReducer,
    modal: modalReducer,
  },
});
