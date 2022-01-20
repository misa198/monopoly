import { useSelector } from "react-redux";
import Board from "./components/Board";
import EnterGame from "./components/EnterGame";

const App = () => {
  const name = useSelector((state) => state.board.name);
  const users = useSelector((state) => state.board.users);

  return name ? (
    users.length === 4 ? (
      <Board />
    ) : (
      "Chưa đủ người"
    )
  ) : (
    <EnterGame />
  );
};

export default App;
