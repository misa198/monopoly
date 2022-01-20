import { createSlice } from "@reduxjs/toolkit";
import { positions } from "../../constants/items";

const boardSlice = createSlice({
  name: "board",
  initialState: {
    name: "",
    log: [],
    dices: [1, 2],
    turn: 1,
    users: [],
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setUser(state, action) {
      state.users = action.payload;
    },
    addUser(state, action) {
      state.users.push(action.payload);
    },
    setDices(state, action) {
      state.dices = action.payload;
    },
    updateUserPosition(state, action) {
      const score = action.payload.scores[0] + action.payload.scores[1];
      const currentUserIndex = state.users.findIndex(
        (u) => u.name === action.payload.name
      );
      const currentPostionIndex = positions.findIndex(
        (p) => p === state.users[currentUserIndex].position
      );
      const newPositionIndex = (currentPostionIndex + score) % positions.length;
      state.users[currentUserIndex].position = positions[newPositionIndex];
    },
    addLog(state, action) {
      state.log.push(action.payload);
    },
    nextTurn(state) {
      state.turn += 1;
    },
  },
});

export default boardSlice.reducer;
export const boardActions = boardSlice.actions;
