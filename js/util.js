const ALERT_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const createIDGenerator = () => {
  let numberID = 0;
  return () => {
    numberID += 1;
    return numberID;
  };
};

const showAlert = () => {
  const newMessage = dataErrorTemplate.cloneNode(true);
  document.body.insertBefore(newMessage, document.body.lastChild);

  setTimeout(() => {
    if (newMessage) {
      newMessage.remove();
    }
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const shuffle = (elements) => {
  const fixedElement = elements[0];
  const restArray = elements.slice(1);
  for (let i = restArray.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [restArray[i], restArray[j]] = [restArray[j], restArray[i]];
  }

  return [fixedElement,...restArray];
};

export {
  getRandomInteger,
  getRandomArrayElement,
  createIDGenerator,
  showAlert,
  debounce,
  shuffle
};
