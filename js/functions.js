// eslint-disable-next-line no-unused-vars
const checkStringLength = (string, maxlength) => string.length <= maxlength;

// eslint-disable-next-line no-unused-vars
const isPalindrome = (string) => {
  const cleaned = string.toLowerCase().replaceAll(' ', '');
  for (let i = 0; i < cleaned.length / 2; i++) {
    if (cleaned[i] !== cleaned[cleaned.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

// eslint-disable-next-line no-unused-vars
const searchNumber = (input) => {
  const string = input.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    const number = parseInt(string[i], 10);
    if (!Number.isNaN(number)) {
      result += number;
    }
  }
  return parseInt(result, 10);
};
