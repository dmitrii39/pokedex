import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    pokemon: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.pokemon = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.pokemon = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalIsOpen = (state) => state.modal.isOpen;
export const selectModalPokemon = (state) => state.modal.pokemon;

export default modalSlice.reducer;
