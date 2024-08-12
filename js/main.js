import {getData} from './api-client.js';
import {renderGallery} from './gallery.js';
import {generateMorePictures} from './mock-data.js';
import {showAlert} from './util.js';
import {renderFilter} from './filter.js';
import './form.js';

getData().then((pictures) => {
  renderGallery(pictures);
  renderFilter(() => pictures);
}).catch(() => {
  showAlert();
  renderGallery(generateMorePictures());
});
