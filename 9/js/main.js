import {renderThumbnails} from './thumbnail.js';
import {generatePhotos} from './data.js';
import { initUploadForm } from './form.js';

const photos = generatePhotos();

renderThumbnails(photos);

initUploadForm(); 
