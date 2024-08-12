const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    measure: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    measure: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    measure: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    measure: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    measure: '',
  },
];
const DEFAULT_EFFECT = EFFECTS[0];

const form = document.querySelector('.img-upload__form');
const previewImage = form.querySelector('.img-upload__preview > img');
const sliderContainer = form.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const effectLevel = sliderContainer.querySelector('.effect-level__value');

let chosenEffect = DEFAULT_EFFECT;

const isDefaultEffect = () => chosenEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  sliderContainer.classList.remove('hidden');
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefaultEffect()) {
    sliderContainer.classList.add('hidden');
  }
};

const onFormChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
    updateSlider();
  }
};

const onSliderUpdate = () => {
  previewImage.style.filter = 'none';
  previewImage.className = '';
  effectLevel.value = 0;
  if (!isDefaultEffect()) {
    const sliderValue = slider.noUiSlider.get();
    previewImage.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.measure})`;
    previewImage.classList.add(`effects__preview--${chosenEffect.name}`);
    effectLevel.value = sliderValue;
  }
};

const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

noUiSlider.create(slider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});
updateSlider();

form.addEventListener('change', onFormChange);
slider.noUiSlider.on('update', onSliderUpdate);

export { resetEffects };
