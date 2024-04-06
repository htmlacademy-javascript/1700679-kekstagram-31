import {uploadImage} from './src/postImage/postFormEditor';
import {getData} from './src/api/api';
import {timedMessage} from './src/api/messages';
import initThumbnailsSorting from './src/imageRender/thumbnailsSorting';
import createThumbnails from './src/imageRender/thumbnails';
const ERROR_DELAY = 5000;

getData().then((posts) => {
  createThumbnails(posts);
  initThumbnailsSorting(posts);
}).catch(() => timedMessage('data-error', ERROR_DELAY));
uploadImage();
