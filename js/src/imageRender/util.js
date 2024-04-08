const generateRandomNumber = (min, max) => {
  min = Math.floor(Math.min(min, max));
  max = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const debounce = (callback, delay) => {
  let timerId;

  return (...rest) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback.apply(this, rest), delay);
  };
};

export { generateRandomNumber, debounce };
