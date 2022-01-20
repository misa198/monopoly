import { useMemo } from "react";
import ReactTooltip from "react-tooltip";
import "./Item.scss";
import { useSelector } from "react-redux";

const Item = ({ item, position }) => {
  const users = useSelector((state) => state.board.users);
  const currentUsers = useMemo(
    () => users.filter((u) => u.position === position),
    [position, users]
  );
  const [owner, level] = useMemo(() => {
    let o, l;
    users.forEach((u) => {
      const asset = u.assets.find((a) => a.locale === position);
      if (asset) {
        o = u;
        l = asset.level;
      }
    });
    return [o, l];
  }, [position, users]);

  return (
    <>
      <div className="item" data-tip data-for={position}>
        <div className="item__name">{item.name}</div>
        {owner && (
          <>
            {item.prices && (
              <>
                <div className="item__price">{item.prices[level]}</div>
                <div
                  className="item__color"
                  style={{ backgroundColor: owner.color }}
                >
                  {level + 1}
                </div>
              </>
            )}
          </>
        )}
        {currentUsers && (
          <div className="item__users">
            {currentUsers.map((u, i) => (
              <div
                className="item__user"
                key={i}
                style={{ backgroundColor: u.color }}
              ></div>
            ))}
          </div>
        )}
      </div>
      <ReactTooltip id={`${position}`} aria-haspopup="true" effect="solid">
        <h3>Prices</h3>
        <div>
          {item.prices &&
            item.prices.map((p, i) => (
              <div key={i}>
                Level {i + 1} - {p}
              </div>
            ))}
        </div>
      </ReactTooltip>
    </>
  );
};

export default Item;
