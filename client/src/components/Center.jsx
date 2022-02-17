import WsContext from '../app/contexts/WsContext';
import { useSelector } from 'react-redux';
import './Center.scss';
import { roleDice as rD } from '../utils/roleDice';
import { useContext, useState, useMemo, useEffect } from 'react';
import Chart from './Chart';
import { items } from '../constants/items';

const Center = () => {
  const log = useSelector((state) => state.board.log);
  const dices = useSelector((state) => state.board.dices);
  const name = useSelector((state) => state.board.name);
  const turn = useSelector((state) => state.board.turn);
  const users = useSelector((state) => state.board.users);
  const tradeTurn = useSelector((state) => state.board.tradeTurn);
  const assets = useSelector((state) => state.board.assets);
  const lose = useSelector((state) => state.board.lose);
  const userOrder = useMemo(() => {
    return users.findIndex((u) => u.name === name);
  }, [name, users]);
  const { sendMessage } = useContext(WsContext);
  const [isDisabledRoleButton, setIsDisabledRoleButton] = useState(true);

  console.log(assets);

  useEffect(() => {
    if (turn % 4 === userOrder) {
      setIsDisabledRoleButton(false);
      if (lose) {
        sendMessage(
          JSON.stringify({
            type: 'SKIP_TURN',
          }),
        );
      }
    } else {
      setIsDisabledRoleButton(true);
    }
    if (tradeTurn === userOrder) {
      // Check exist asset
      let index = 0;
      users.forEach((u, i) => {
        if (u.name === name) index = i;
      });
      let locale = users[index].position;
      if (locale !== 30) {
        if (!assets[locale].name) {
          const tradeStatus = window.confirm('Bạn có muốn mua nhà không?');
          if (tradeStatus) {
            if (users[index].money <= items[locale].prices[0])
              alert('Bạn không đủ tiền mua!');
            else {
              sendMessage(
                JSON.stringify({
                  type: 'ADD_ASSET',
                  payload: {
                    name,
                    index,
                    locale,
                  },
                }),
              );
            }
          }
        } else {
          if (assets[locale].name === name) {
            if (assets[locale].level < 2) {
              const upgradeStatus = window.confirm(
                'Bạn có muốn nâng cấp nhà không?',
              );
              if (upgradeStatus) {
                let assetIndex = 0;
                users[index].assets.forEach((a, i) => {
                  if (a.locale === locale) assetIndex = i;
                });
                let beforeLevel = users[index].assets[assetIndex].level;
                let afterLevelPrice = items[locale].prices[beforeLevel + 1];
                if (users[index].money < afterLevelPrice)
                  alert('Bạn không đủ tiền nâng cấp!');
                else {
                  sendMessage(
                    JSON.stringify({
                      type: 'UPGRADE_ASSET',
                      payload: {
                        index,
                        locale,
                        assetIndex,
                        afterLevelPrice,
                      },
                    }),
                  );
                }
              }
            }
          } else {
            alert('Bạn bị trừ tiền!');
            sendMessage(
              JSON.stringify({
                type: 'FINE',
                payload: {
                  index,
                  locale,
                  level: assets[locale].level,
                },
              }),
            );
          }
        }
      }
    }
  }, [turn]);

  const roleDice = () => {
    const scores = rD();
    sendMessage(
      JSON.stringify({
        type: 'ROLE_DICE',
        payload: {
          scores,
          name,
          tradeTurn: userOrder,
        },
      }),
    );
  };

  console.log(users);

  return (
    <div className="center">
      <div className="dices">
        <div className="dices__items">
          {dices.map((d, i) => (
            <img key={i} src={`/images/dice-${d}.png`} alt="dice" />
          ))}
        </div>
        <button disabled={isDisabledRoleButton} onClick={roleDice}>
          Role
        </button>
      </div>

      <div className="center-content">
        <div className="log">
          {log.map((l, i) => (
            <div className="log__line" key={i}>
              {l}
            </div>
          ))}
        </div>
        <Chart />
      </div>
    </div>
  );
};

export default Center;
