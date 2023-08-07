import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slice';

export default configureStore({
  reducer: {
    game: gameReducer,
  },
});
