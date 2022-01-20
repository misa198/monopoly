import { useSelector, useDispatch } from "react-redux";
import "./Center.scss";
import { boardActions } from "../app/store/boardSlice";

const Center = () => {
  const dispatch = useDispatch();
  const log = useSelector((state) => state.board.log);
  const dices = useSelector((state) => state.board.dices);

  const roleDice = () => {
    dispatch(boardActions.roleDice());
  };

  return (
    <div className="center">
      <div className="dices">
        <div className="dices__items">
          {dices.map((d, i) => (
            <img key={i} src={`/images/dice-${d}.png`} alt="dice" />
          ))}
        </div>
        <button onClick={roleDice}>Role</button>
      </div>

      <div className="log">
        {log.map((l, i) => (
          <div className="log__line" key={i}>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Center;
