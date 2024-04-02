import {createThumbnails} from './src/postRender/thumbnails';
import {uploadImage} from './src/postAdd/addPostForm';
import {getData} from './src/api/api';
import displayMessage from './src/api/displayMessage';

getData().then((posts) => {
  createThumbnails(posts);
// eslint-disable-next-line no-unused-vars
}).catch((err) => {
  displayMessage('internet-error');
});
uploadImage();
