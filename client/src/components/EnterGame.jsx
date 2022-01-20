import { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../app/store/boardSlice";
import "./EnterGame.scss";
import WsContext from "../app/contexts/WsContext";
import { colors } from "../constants/items";

const EnterGame = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const { sendMessage } = useContext(WsContext);
  const users = useSelector((state) => state.board.users);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name) {
      if (users.length < 4) {
        const usedColors = [];
        users.forEach((user) => {
          usedColors.push(user.color);
        });
        colors.forEach((c) => {
          if (!usedColors.includes(c)) {
            sendMessage(
              JSON.stringify({
                type: "JOIN_GAME",
                payload: {
                  name,
                  color: c,
                },
              })
            );
            return;
          }
        });
        dispatch(boardActions.setName(name));
      } else {
        alert("Game đã đủ người");
      }
    }
  };

  return (
    <div className="enter-game">
      <h1>Vào game</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Tên của bạn" onChange={onNameChange} />
        <button>Xác nhận</button>
      </form>
    </div>
  );
};

export default EnterGame;
