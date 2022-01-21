import { useEffect, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { boardActions } from "../store/boardSlice";
import { positions } from "../../constants/items";

const WsContext = createContext("ws");

const WsProvider = ({ children }) => {
  const socketUrl = "ws://localhost:8080";
  const socket = useWebSocket(socketUrl);
  const dispatch = useDispatch();
  const { sendMessage, lastMessage, readyState } = socket;
  const name = useSelector((state) => state.board.name);
  const users = useSelector((state) => state.board.users);

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendMessage(
        JSON.stringify({
          type: "CONNECT",
        })
      );
    }
  }, [readyState, sendMessage]);

  useEffect(() => {
    const rawData = lastMessage?.data;
    if (rawData) {
      const data = JSON.parse(rawData);
      console.log(data);

      if (data.type === "CONNECT") {
        if (name) {
          sendMessage(
            JSON.stringify({
              type: "USERS",
              payload: {
                users,
              },
            })
          );
        }
      }

      if (data.type === "USERS") {
        if (users.length === 0)
          dispatch(boardActions.setUser(data.payload.users));
      }

      if (data.type === "JOIN_GAME") {
        if (!users.find((u) => u.name === data.payload.name)) {
          dispatch(
            boardActions.addUser({
              ...data.payload,
              position: positions[0],
              money: 2000,
              assets: [],
            })
          );
        }
      }

      if (data.type === "ROLE_DICE") {
        const { name, scores } = data.payload;
        dispatch(boardActions.nextTurn());
        const newLog = `${name} đã tung được ${scores.join(", ")}`;
        dispatch(boardActions.setDices(scores));
        dispatch(boardActions.addLog(newLog));
        dispatch(boardActions.updateUserPosition({ name, scores }));
      }
    }
  }, [lastMessage]);

  return <WsContext.Provider value={socket}>{children}</WsContext.Provider>;
};

export default WsContext;
export { WsProvider };
