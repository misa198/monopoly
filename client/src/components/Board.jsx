import "./Board.scss";
import { items } from "../constants/items";
import Center from "./Center";
import Item from "./Item";

const Board = () => {
  return (
    <div className="board">
      <Center />
      {[...Array(36).keys()].map((i) => (
        <div key={i} className="land">
          {items[i] && <Item item={items[i]} position={i} />}
        </div>
      ))}
    </div>
  );
};

export default Board;
