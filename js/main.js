import {createThumbnails} from './src/postRender/thumbnails';
import {uploadImage} from './src/postAdd/addPostForm';
import {getData} from './src/api/api';
import {dataError} from './src/api/messages';


getData().then((posts) => {
  createThumbnails(posts);
// eslint-disable-next-line no-unused-vars
}).catch((err) => {
  dataError();
});
uploadImage();
