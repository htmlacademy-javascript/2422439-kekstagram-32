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

export {
  getRandomInteger,
  getRandomArrayElement,
  createIDGenerator,
  showAlert
};
