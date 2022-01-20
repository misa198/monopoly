import "./Item.scss";

const Item = ({ item }) => {
  return (
    <div className="item">
      <div className="item__name">{item.name}</div>
      <div className="item__price">100</div>
      <div className="item__color">1</div>
      <div className="item__users">
        <div className="item__user"></div>
        <div className="item__user"></div>
      </div>
    </div>
  );
};

export default Item;
