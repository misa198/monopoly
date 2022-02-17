import { createSlice } from '@reduxjs/toolkit';
import { positions, items } from '../../constants/items';

const assets = Object.fromEntries(
  positions.map((pos, index) => {
    return [
      pos,
      {
        name: undefined,
        level: 0,
      },
    ];
  }),
);
console.log(assets);

const boardSlice = createSlice({
  name: 'board',
  lose: false,
  initialState: {
    name: '',
    log: [],
    dices: [1, 2],
    turn: 1,
    users: [],
    tradeTurn: 0,
    assets,
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
        (u) => u.name === action.payload.name,
      );
      const currentPostionIndex = positions.findIndex(
        (p) => p === state.users[currentUserIndex].position,
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
    setTradeTurn(state, action) {
      state.tradeTurn = action.payload.tradeTurn;
    },
    addAsset(state, action) {
      let level = 0;
      const { index, locale, name } = action.payload;
      // Add asset
      state.users[index].assets.push({
        locale,
        level,
      });
      state.assets[locale].name = name;
      // Money calculate
      state.users[index].money -= items[locale].prices[level];
    },
    fine(state, action) {
      const { index, locale, level } = action.payload;
      let ownerIndex = 0;
      let ownerName = state.assets[locale].name;
      state.users.forEach((u, i) => {
        if (u.name === ownerName) ownerIndex = i;
      });
      // Fine
      state.users[index].money -= items[locale].prices[level] * 0.6;
      // Bonus
      state.users[ownerIndex].money += items[locale].prices[level] * 0.6;
    },
    setLose(state) {
      state.lose = true;
    },
    upgradeAsset(state, action) {
      const { index, locale, assetIndex, afterLevelPrice } = action.payload;
      state.users[index].assets[assetIndex].level++;
      state.users[index].money -= afterLevelPrice;
      state.assets[locale].level++;
    },
  },
});

export default boardSlice.reducer;
export const boardActions = boardSlice.actions;
