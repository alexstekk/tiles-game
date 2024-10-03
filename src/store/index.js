import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardList: [],
  turns: 0,
  firstCard: null,
  secondCard: null,
  disabledCards: false,
  score: 0,
};

const gameSlice = createSlice({
  name: "@@game",
  initialState,
  reducers: {
    setCards: (state, action) => {
      state.cardList = action.payload;
    },
    markMatchedCards: (state, action) => {
      state.cardList = state.cardList.map((card) => (card.src === action.payload ? { ...card, isMatched: true } : card));
    },
    setFirstCard: (state, action) => {
      state.firstCard = action.payload;
    },
    setSecondCard: (state, action) => {
      state.secondCard = action.payload;
    },
    resetTurns: (state, action) => {
      state.turns = 0;
    },
    increaseTurns: (state, action) => {
      state.turns = state.turns + 1;
    },
    disableCards: (state, action) => {
      state.disabledCards = action.payload;
    },
    increaseScore: (state, action) => {
      state.score = state.score + 1;
    },
  },
});

export const { setCards, setFirstCard, setSecondCard, setTurns, disableCards, increaseTurns, resetTurn, increaseScore, resetTurns,markMatchedCards } = gameSlice.actions;

export const store = configureStore({
  reducer: gameSlice.reducer,
});
