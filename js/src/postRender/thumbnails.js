import { generateImagePosts } from './util.js';
import { showBigPicture } from './bigPicture.js';

const pictureTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');

const postParser = (post) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const image = pictureElement.querySelector('.picture__img');
  const likes = pictureElement.querySelector('.picture__likes');
  const comments = pictureElement.querySelector('.picture__comments');

  image.src = post.url;
  image.alt = post.description;
  likes.textContent = post.likes;
  comments.textContent = post.comments.length;


  pictureElement.addEventListener('click', () => {
    showBigPicture(post);
  });

  return pictureElement;
};


export const createThumbnails = () => {
  const posts = generateImagePosts(25, 30);
  const fragment = document.createDocumentFragment();
  const pictures = document.querySelector('.pictures');

  posts.forEach((post) => {
    const pictureElement = postParser(post);
    fragment.appendChild(pictureElement);
  });

  pictures.appendChild(fragment);
};
