let currentPost = null;
let commentsShown = 0;
const commentsLoader = document.querySelector('.comments-loader');
const closeButton = document.getElementById('picture-cancel');
const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
let clickHandler = null;
let loadMoreCommentsHandler = null;

const openModal = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
};

const renderImageAndDescription = (post) => {
  const bigPictureImage = document.querySelector('.big-picture__img img');
  bigPictureImage.src = post.url;

  const bigPictureLikes = document.querySelector('.likes-count');
  bigPictureLikes.textContent = post.likes;

  const bigPictureCaption = document.querySelector('.social__caption');
  bigPictureCaption.textContent = post.description;
};

const renderCommentBatch = (comments) => {
  const commentsContainer = document.querySelector('.social__comments');

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

  const bigPictureCommentsSize = document.querySelector('.social__comment-shown-count');
  bigPictureCommentsSize.textContent = commentsShown.toString();
};

const loadMoreComments = () => {
  const startIndex = commentsShown;
  const endIndex = Math.min(startIndex + 5, currentPost.comments.length);

  const commentsToRender = currentPost.comments.slice(startIndex, endIndex);
  renderCommentBatch(commentsToRender);

  if (commentsShown === currentPost.comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const renderComments = (post) => {
  currentPost = post;
  commentsShown = 0;

  const commentsContainer = document.querySelector('.social__comments');

  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }

  const commentsToRender = post.comments.slice(0, 5);
  renderCommentBatch(commentsToRender);

  const bigPictureCommentsSize = document.querySelector('.social__comment-shown-count');
  bigPictureCommentsSize.textContent = commentsToRender.length.toString();

  const bigPictureCommentsTotal = document.querySelector('.social__comment-total-count');
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

export default showBigPicture
