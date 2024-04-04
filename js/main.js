import {createThumbnails} from './src/postRender/thumbnails';
import {uploadImage} from './src/postAdd/addPostForm';
import {getData} from './src/api/api';
import {timedMessage} from './src/api/messages';


getData().then((posts) => {
  createThumbnails(posts);
// eslint-disable-next-line no-unused-vars
}).catch((err) => {
  timedMessage('data-error', 5000);
});
uploadImage();
