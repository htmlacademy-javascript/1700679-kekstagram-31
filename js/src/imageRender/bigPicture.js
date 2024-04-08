const COMMENTS_BATCH_SIZE = 5;
const INITIAL_COMMENTS_COUNT = 5;

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

let clickHandler = null;
let loadMoreCommentsHandler = null;
let currentPost = null;
let commentsShown = 0;

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
    avatar.width = 35;
    avatar.height = 35;

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

const loadMoreComments = () => {
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

  if (post.comments.length > 5) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }
};

commentsLoader.addEventListener('click', loadMoreComments);

const close = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

};

const setupCloseHandlers = () => {
  const closeHandler = (event) => {
    if (event.key === 'Escape' || event.code === 'Escape') {
      close();
      document.removeEventListener('keydown', closeHandler);
    }
  };

  document.addEventListener('keydown', closeHandler);

  if (clickHandler) {
    closeButton.removeEventListener('click', clickHandler);
  }

  clickHandler = () => {
    close();
    closeButton.removeEventListener('click', clickHandler);
    commentsLoader.removeEventListener('click', loadMoreCommentsHandler);
  };
  closeButton.addEventListener('click', clickHandler);
};

const showBigPicture = (post) => {
  openModal();
  renderImageAndDescription(post);
  renderComments(post);

  if (loadMoreCommentsHandler) {
    commentsLoader.removeEventListener('click', loadMoreCommentsHandler);
  }

  loadMoreCommentsHandler = loadMoreComments;
  commentsLoader.addEventListener('click', loadMoreCommentsHandler);

  setupCloseHandlers();
};

export default showBigPicture;
