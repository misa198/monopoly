import { createSlice } from "@reduxjs/toolkit";
import { positions } from "../../constants/items";
import { roleDice } from "../../utils/roleDice";

const boardSlice = createSlice({
  name: "board",
  initialState: {
    name: "",
    log: [],
    dices: [1, 2],
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
    roleDice(state) {
      const score = roleDice();
      state.log.push(`${state.name} roled dice: ${score[0]} and ${score[1]}`);
      state.dices = score;
    },
  },
});

export default boardSlice.reducer;
export const boardActions = boardSlice.actions;
