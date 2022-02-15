import "./Chart.scss";
import { useSelector } from "react-redux";

const Chart = () => {
  const users = useSelector((state) => state.board.users);

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
