import { createSlice } from "@reduxjs/toolkit";
import { positions } from "../../constants/items";
import { roleDice } from "../../utils/roleDice";

const boardSlice = createSlice({
  name: "board",
  initialState: {
    name: "A",
    log: [],
    dices: [1, 2],
    users: [
      {
        name: "A",
        color: "red",
        position: positions[0],
        money: 2000,
        assets: [
          {
            locale: 0,
            level: 0,
          },
          {
            locale: 1,
            level: 2,
          },
        ],
      },
    ],
  },
  reducers: {
    roleDice(state) {
      const score = roleDice();
      state.log.push(`${state.name} roled dice: ${score[0]} and ${score[1]}`);
      state.dices = score;
    },
  },
});

export default boardSlice.reducer;
export const boardActions = boardSlice.actions;
