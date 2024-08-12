import {getData} from './api-client.js';
import {renderGallery} from './gallery.js';
import {generateMorePictures} from './mock-data.js';
import {showAlert} from './util.js';
import './form.js';

getData().then((pictures) => {
  renderGallery(pictures);
}).catch(() => {
  showAlert();
  renderGallery(generateMorePictures());
});
