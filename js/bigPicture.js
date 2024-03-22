const openModal = () => {
  const bigPicture = document.querySelector('.big-picture');
  const body = document.querySelector('body');

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

const renderComments = (post) => {
  const commentsContainer = document.querySelector('.social__comments');
  post.comments.forEach((comment) => {
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

  const bigPictureCommentsSize = document.querySelector('.social__comment-shown-count');
  bigPictureCommentsSize.textContent = post.comments.length.toString();

  const bigPictureCommentsTotal = document.querySelector('.social__comment-total-count');
  bigPictureCommentsTotal.textContent = post.comments.length.toString();

  const commentCount = document.querySelector('.social__comment-count');
  const commentsLoader = document.querySelector('.comments-loader');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

const close = () => {
  const body = document.querySelector('body');
  const bigPicture = document.querySelector('.big-picture');

  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

export const closeBigPicture = () => {
  const closeHandler = (event) => {
    if (event.key === 'Escape' || event.code === 'Escape') {
      close();
      document.removeEventListener('keydown', closeHandler);
    }
  };

  document.addEventListener('keydown', closeHandler);

  const closeButton = document.getElementById('picture-cancel');
  const clickHandler = () => {
    close();
    closeButton.removeEventListener('click', clickHandler);
  };
  closeButton.addEventListener('click', clickHandler);
};

export const showBigPicture = (post) => {
  openModal();
  renderImageAndDescription(post);
  renderComments(post);
};
