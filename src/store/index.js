import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardList: [],
  turns: 0,
  firstCard: null,
  seconsCard: null,
  disabledCards: false,
};

const gameSlice = createSlice({
  name: "@@game",
  initialState,
  reducers: {
    setCards: (state, action) => {
      state.cardList = action.payload;
    },
  },
});

export const { setCards } = gameSlice.actions;

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});
