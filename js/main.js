import {createThumbnails} from './src/postRender/thumbnails';
import {uploadImage} from './src/postAdd/addPostForm';
import {getData} from './src/api/api';
const internetErrorTemplate = document.querySelector('#data-error');


getData().then((posts) => {
  createThumbnails(posts);
// eslint-disable-next-line no-unused-vars
}).catch((err) => {
  const template = internetErrorTemplate.content.cloneNode(true).firstElementChild;
  document.body.appendChild(template);
  setTimeout(() => {
    template.remove();
  }, 5000);
});
uploadImage();
