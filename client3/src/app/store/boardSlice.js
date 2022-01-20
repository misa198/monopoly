import { createSlice } from "@reduxjs/toolkit";
import { positions } from "../../constants/items";

const boardSlice = createSlice({
  name: "board",
  initialState: {
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
});

export default boardSlice.reducer;
export const boardActions = boardSlice.actions;
