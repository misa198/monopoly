import { useSelector } from 'react-redux';
import Board from './components/Board';
import EnterGame from './components/EnterGame';

const App = () => {
  const name = useSelector((state) => state.board.name);
  const users = useSelector((state) => state.board.users);
  const dices = useSelector((state) => state.board.dices);

  return name ? (
    users.length === 4 ? (
      <Board dices={dices} />
    ) : (
      'Chưa đủ người'
    )
  ) : (
    <EnterGame />
  );
};

export default App;
