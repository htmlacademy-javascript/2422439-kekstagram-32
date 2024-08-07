const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createCard = ({url, description, likes, comments, id}) => {
  const newCard = thumbnailTemplate.cloneNode(true);
  const newCardImage = newCard.querySelector('.picture__img');
  newCardImage.src = url;
  newCardImage.alt = description;
  newCard.querySelector('.picture__likes').textContent = likes;
  newCard.querySelector('.picture__comments').textContent = comments.length;
  newCard.dataset.thumbnailId = id;

  return newCard;
};

const generateThumbnails = (pictures, container) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const newCard = createCard(picture);
    fragment.append(newCard);
  });

  container.append(fragment);
};

export {generateThumbnails};
