import rn from "random-number";

export const roleDice = () => {
  const options = {
    min: 1,
    max: 6,
    integer: true,
  };
  return [rn(options), rn(options)];
};
