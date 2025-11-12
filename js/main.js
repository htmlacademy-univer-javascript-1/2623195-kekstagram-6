import {renderThumbnails} from './thumbnail.js';
import {generatePhotos} from './data.js';

const photos = generatePhotos();

renderThumbnails(photos);
