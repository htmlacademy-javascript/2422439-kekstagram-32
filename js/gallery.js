const galleryTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createCard = ({url, description, likes, comments}) => {
  const newCard = galleryTemplate.cloneNode(true);
  const newCardImage = newCard.querySelector('.picture__img');
  newCardImage.src = url;
  newCardImage.alt = description;
  newCard.querySelector('.picture__likes').textContent = likes;
  newCard.querySelector('.picture__comments').textContent = comments.length;

  return newCard;
};

const generateGallery = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const newCard = createCard(picture);
    fragment.append(newCard);
  });

  container.append(fragment);
};

export {generateGallery};
