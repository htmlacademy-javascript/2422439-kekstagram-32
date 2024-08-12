import {clearGallery} from './gallery.js';
import {debounce,shuffle} from './util.js';
import {renderGallery} from './gallery.js';

const RANDOM_PICTURES_COUNT = 10;
const filter = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');

const resetFilter = () => {
  filterButtons?.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
};

const appyFilter = (filterId, getPictures) => {
  let pictures = getPictures();
  clearGallery();

  switch(filterId) {
    case 'filter-random': {
      pictures = shuffle(pictures.slice()).slice(0, RANDOM_PICTURES_COUNT);
      break;
    }
    case 'filter-discussed': {
      pictures = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
      break;
    }
  }

  renderGallery(pictures);
};

const setFilter = debounce((filterId, getPictures) => {
  appyFilter(filterId, getPictures);
});

const onFilterClick = (evt, getPictures) => {
  const target = evt.target;
  const currentFilter = filterForm.querySelector('.img-filters__button--active');
  if (target.classList.contains('img-filters__button')) {
    if (target.id === currentFilter.id) {
      return;
    }

    resetFilter();
    target.classList.add('img-filters__button--active');
    setFilter(target.id, getPictures);
  }
};

const renderFilter = (getPictures) => {
  filter?.classList.remove('img-filters--inactive');
  filterForm?.addEventListener('click', (evt) => onFilterClick(evt, getPictures));
};

export {
  renderFilter
};
