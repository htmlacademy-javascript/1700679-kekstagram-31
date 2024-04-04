import {uploadImage} from './src/postAdd/addPostForm';
import {getData} from './src/api/api';
import {timedMessage} from './src/api/messages';
import initThumbnailsSorting from './src/postRender/thumbnailsSorting';
import {createThumbnails} from './src/postRender/thumbnails';
const ERROR_DELAY = 5000;

getData().then((posts) => {
  createThumbnails(posts);
  initThumbnailsSorting(posts);
// eslint-disable-next-line no-unused-vars
}).catch((err) => {
  timedMessage('data-error', ERROR_DELAY);
});
uploadImage();
