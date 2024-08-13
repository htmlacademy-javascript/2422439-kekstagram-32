import {getData} from './api-client.js';
import {showAlert} from './util.js';
import {renderFilter, prepareFilter} from './filter.js';
import './form.js';

try {
  prepareFilter();
  const pictures = await getData();
  if (pictures) {
    renderFilter(pictures);
  }
} catch {
  showAlert();
}
