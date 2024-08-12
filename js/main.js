import {getData} from './api-client.js';
import {renderGallery} from './gallery.js';
import {generateMorePictures} from './mock-data.js';
import {showAlert} from './util.js';
import {renderFilter, prepareFilter} from './filter.js';
import './form.js';

try {
  prepareFilter();
  const pictures = await getData();
  if (pictures) {
    renderFilter(pictures);
  } else {
    renderGallery(generateMorePictures());
  }
} catch {
  showAlert();
  renderGallery(generateMorePictures());
}
