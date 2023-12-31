// slice.js

import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    score: 0,
    currentQuestion: null,
    gameOver: false,
  },
  reducers: {
    incrementScore: (state, action) => {
      state.score += action.payload || 1; // increment by payload value or 1 if no payload
    },
    setQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    setGameOver: (state, action) => {
      state.gameOver = action.payload;
    },
  },
});

export const { incrementScore, setQuestion, setGameOver } = gameSlice.actions;

export default gameSlice.reducer;
