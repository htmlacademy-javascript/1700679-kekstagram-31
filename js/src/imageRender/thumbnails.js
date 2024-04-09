import showBigPicture from './bigPicture.js';
let onThumbnailClick = null;
const pictureTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');

const parsePost = (post) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const image = pictureElement.querySelector('.picture__img');
  const likes = pictureElement.querySelector('.picture__likes');
  const comments = pictureElement.querySelector('.picture__comments');
  image.src = post.url;
  image.alt = post.description;
  likes.textContent = post.likes;
  comments.textContent = post.comments.length;

  if (onThumbnailClick) {
    pictureElement.removeEventListener('click', onThumbnailClick);
  }

  onThumbnailClick = () => showBigPicture(post);
  pictureElement.addEventListener('click', onThumbnailClick);

  return pictureElement;
};

const createThumbnails = (posts) => {
  if (!Array.isArray(posts)) {
    throw new Error('Posts must be an array');
  }
  const fragment = document.createDocumentFragment();
  const pictures = document.querySelector('.pictures');
  const previewPictures = document.querySelectorAll('.picture');
  previewPictures.forEach((picture) => picture.remove());
  posts.forEach((post) => {
    const pictureElement = parsePost(post);
    fragment.appendChild(pictureElement);
  });

  pictures.appendChild(fragment);
};

export default createThumbnails;
