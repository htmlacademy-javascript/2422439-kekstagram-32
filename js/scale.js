const scale = document.querySelector('.img-upload__scale');
const smallerButton = scale.querySelector('.scale__control--smaller');
const biggerButton = scale.querySelector('.scale__control--bigger');
const scaleValue = scale.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview > img');

const DEFAULT_SCALE = 100;
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const resetScale = () => {
  imagePreview.style.transform = `scale(${DEFAULT_SCALE / MAX_SCALE})`;
  scaleValue.value = `${DEFAULT_SCALE}%`;
};

const scaleImage = (step) => {
  let currentValue = parseInt(scaleValue.value, 10);
  currentValue += step;
  if (currentValue < MIN_SCALE) {
    currentValue = MIN_SCALE;
  } else if (currentValue > MAX_SCALE) {
    currentValue = MAX_SCALE;
  }
  scaleValue.value = `${currentValue}%`;
  imagePreview.style.transform = `scale(${currentValue / MAX_SCALE})`;
};

smallerButton.addEventListener('click', () => {
  scaleImage(-SCALE_STEP);
});

biggerButton.addEventListener('click', () => {
  scaleImage(SCALE_STEP);
});

export { resetScale };
