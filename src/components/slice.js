import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    score: 0,
    currentQuestion: null,
    gameOver: false,
  },
  reducers: {
    incrementScore: state => {
      state.score += 1;
    },
    setQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    setGameOver: state => {
      state.gameOver = true;
    },
  },
});

export const { incrementScore, setQuestion, setGameOver } = gameSlice.actions;

export default gameSlice.reducer;
