import {clearGallery} from './gallery.js';
import {debounce,shuffle} from './util.js';
import {renderGallery} from './gallery.js';

const RANDOM_PICTURES_COUNT = 10;
const filter = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');
const Filter = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
let cards = null;

const resetFilter = () => {
  filterButtons?.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
};

const applyFilter = (filterId) => {
  let pictures = cards;
  clearGallery();

  switch(filterId) {
    case Filter.RANDOM: {
      pictures = shuffle(pictures.slice()).slice(0, RANDOM_PICTURES_COUNT);
      break;
    }
    case Filter.DISCUSSED: {
      pictures = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
      break;
    }
  }

  renderGallery(pictures);
};

const setFilter = debounce((filterId) => {
  applyFilter(filterId);
});

const onFilterClick = (evt) => {
  const target = evt.target;
  const currentFilter = filterForm.querySelector('.img-filters__button--active');
  if (target.classList.contains('img-filters__button')) {
    if (target.id === currentFilter.id) {
      return;
    }

    resetFilter();
    target.classList.add('img-filters__button--active');
    setFilter(target.id);
  }
};

const prepareFilter = () => {
  filterForm?.addEventListener('click', onFilterClick);
};

const renderFilter = (pictures) => {
  cards = pictures;
  filter?.classList.remove('img-filters--inactive');
  const currentFilter = filterForm.querySelector('.img-filters__button--active');
  applyFilter(currentFilter.id);
};

export {
  renderFilter,
  prepareFilter
};
