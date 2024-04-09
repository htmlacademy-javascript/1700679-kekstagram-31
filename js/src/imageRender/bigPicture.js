const COMMENTS_BATCH_SIZE = 5;
const INITIAL_COMMENTS_COUNT = 5;
const AVATAR_SIZE = 35;

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const commentsContainer = bigPicture.querySelector('.social__comments');
const bigPictureCommentsSize = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureCommentsTotal = bigPicture.querySelector('.social__comment-total-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('#picture-cancel');

let currentPost = null;
let commentsShown;

const openModal = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
};

const renderImageAndDescription = (post) => {
  bigPictureImage.src = post.url;
  bigPictureLikes.textContent = post.likes;
  bigPictureCaption.textContent = post.description;
};

const renderCommentBatch = (comments) => {
  comments.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');

    const avatar = document.createElement('img');
    avatar.classList.add('social__picture');
    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    avatar.width = AVATAR_SIZE;
    avatar.height = AVATAR_SIZE;

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;

    commentItem.appendChild(avatar);
    commentItem.appendChild(commentText);
    commentsContainer.appendChild(commentItem);
  });

  commentsShown += comments.length;

  bigPictureCommentsSize.textContent = commentsShown.toString();
};

const onLoadMoreCommentsClick = () => {
  const startIndex = commentsShown;
  const endIndex = Math.min(startIndex + INITIAL_COMMENTS_COUNT, currentPost.comments.length);

  const commentsToRender = currentPost.comments.slice(startIndex, endIndex);
  renderCommentBatch(commentsToRender);

  if (commentsShown === currentPost.comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const renderComments = (post) => {
  currentPost = post;
  commentsShown = 0;

  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }

  const commentsToRender = post.comments.slice(0, COMMENTS_BATCH_SIZE);
  renderCommentBatch(commentsToRender);

  bigPictureCommentsSize.textContent = commentsToRender.length.toString();
  bigPictureCommentsTotal.textContent = post.comments.length.toString();

  if (post.comments.length > COMMENTS_BATCH_SIZE) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }

  commentsLoader.addEventListener('click', onLoadMoreCommentsClick);
};

const close = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

const setupCloseHandlers = () => {
  const onDocumentKeydown = (event) => {
    if (event.key === 'Escape' || event.code === 'Escape') {
      close();
      document.removeEventListener('keydown', onDocumentKeydown);
      closeButton.removeEventListener('click', onCloseButtonClick);
      commentsLoader.removeEventListener('click', onLoadMoreCommentsClick);
    }
  };

  document.addEventListener('keydown', onDocumentKeydown);

  function onCloseButtonClick(){
    close();
    closeButton.removeEventListener('click', onCloseButtonClick);
    commentsLoader.removeEventListener('click', onLoadMoreCommentsClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
  closeButton.addEventListener('click', onCloseButtonClick);
};

const showBigPicture = (post) => {
  openModal();
  renderImageAndDescription(post);
  renderComments(post);
  setupCloseHandlers();
};

export default showBigPicture;
