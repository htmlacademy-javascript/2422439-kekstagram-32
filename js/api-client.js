const GET_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/data';
const POST_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/';

const validateResponse = (response) => {
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status} - ${response.statusText})`);
  }
};

const getData = async () => {
  const response = await fetch(GET_URL);
  validateResponse(response);

  const result = await response.json();
  const pictures = [];
  Object.keys(result).forEach((key) => {
    pictures.push(result[key]);
  });

  return pictures;
};

const sendData = async (formData) => {
  try {
    const response = await fetch(POST_URL, {
      method: 'POST',
      body: new FormData(formData)
    });

    validateResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

export {getData, sendData};
