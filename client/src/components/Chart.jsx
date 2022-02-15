import "./Chart.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../app/store/boardSlice";

const Chart = () => {
  const users = useSelector((state) => state.board.users);
  const name = useSelector((state) => state.board.name);
  const dispatch = useDispatch();

  useEffect(() => {
    let bankrupt = 0;
    let lose = false;
    let alerted = false;
    users.forEach((user) => {
      if (user.money <= 0) {
        bankrupt++;
      }
      if (user.money <= 0 && user.name === name) {
        lose = true;
      }
      if (lose && !alerted) {
        alert("Bạn thua");
        alerted = true;
        dispatch(boardActions.setLose());
      }
    });
    if (bankrupt === 3) {
      if (lose) {
        alert("Trò chơi kết thúc");
      } else {
        alert("Bạn thắng");
      }
    }
  }, [users]);

  return (
    <div className="chart">
      {users.map((user, id) => (
        <div className="chart__item" key={id}>
          <div
            className="user-color"
            style={{
              backgroundColor: user.color,
            }}
          />
          <div className="user-name">{user.name}:</div>
          <div className="user-money">{user.money}</div>
        </div>
      ))}
    </div>
  );
};

export default Chart;
