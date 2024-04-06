import {getData} from '../data/data.js';


const generateRandomNumber = (min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('min and max must be number');
  }

  min = Math.floor(Math.min(min, max));
  max = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateUniqueId = (idArray, min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('min and max must be number');
  }
  let isUniqueId = true;
  let id;

  do {
    isUniqueId = true;
    id = generateRandomNumber(min, max);

    for (let j = 0; j < idArray.length; j++) {
      if (id === idArray[j]) {
        isUniqueId = false;
        break;
      }
    }
  } while (!isUniqueId);

  idArray.push(id);
  return id;
};

const generateComments = (commentsCount, messages, names) => {
  if (typeof commentsCount !== 'number') {
    throw new Error('commentsCount must be number');
  }

  if (!messages.every((el) => typeof el === 'string')){
    throw new Error('messages must be array of string');
  }

  if (!names.every((el) => typeof el === 'string')){
    throw new Error('messages must be array of string');
  }

  const commentsArray = [];
  const namesArray = names;
  const idArray = [];

  for(let i = 0; i < commentsCount; i++) {
    const id = generateUniqueId(idArray, 1, commentsCount);
    const avatarId = generateRandomNumber(1, 6);
    const avatar = `img/avatar-${avatarId}.svg`;

    const messageFirst = messages[generateRandomNumber(0, messages.length - 1)];
    let messageSecond = messages[generateRandomNumber(0, messages.length - 1)];

    while (messageFirst === messageSecond) {
      messageSecond = messages[generateRandomNumber(0, messages.length - 1)];
    }
    const message = `${messageFirst} ${messageSecond}`;

    const name = namesArray[generateRandomNumber(0, namesArray.length - 1)];

    commentsArray.push({
      id,
      avatar,
      message,
      name
    });
  }

  return commentsArray;
};

const generateImagePosts = (postsCount, maxCommentsCount) => {
  if (typeof postsCount !== 'number') {
    throw new Error('postsCount and commentsCount must be number');
  }

  const idArray = [];
  const urlIdArray = [];
  const result = [];

  const DESCRIPTION_FOR_IMAGE_POST = [...getData().DESCRIPTION_FOR_IMAGE_POST];
  const MESSAGES_FOR_IMAGE_POST = [...getData().MESSAGES_FOR_IMAGE_POST];
  const NAMES_FOR_IMAGE_POST = [...getData().NAMES_FOR_IMAGE_POST];

  if (!DESCRIPTION_FOR_IMAGE_POST.every((el) => typeof el === 'string')){
    throw new Error('descriptions must be array of string');
  }

  if (!MESSAGES_FOR_IMAGE_POST.every((el) => typeof el === 'string')){
    throw new Error('messages must be array of string');
  }

  if (!NAMES_FOR_IMAGE_POST.every((el) => typeof el === 'string')){
    throw new Error('names must be array of string');
  }

  for (let i = 0; i < postsCount; i++) {
    const commentsCount = generateRandomNumber(1, maxCommentsCount);
    const id = generateUniqueId(idArray, 1, postsCount);
    const urlId = generateUniqueId(urlIdArray, 1, postsCount);
    const url = `photos/${urlId}.jpg`;
    const likes = generateRandomNumber(15, 215);
    const comments = generateComments(commentsCount, MESSAGES_FOR_IMAGE_POST, NAMES_FOR_IMAGE_POST);
    const description = DESCRIPTION_FOR_IMAGE_POST[generateRandomNumber(0,DESCRIPTION_FOR_IMAGE_POST.length - 1)];

    result.push({
      id,
      url,
      description,
      likes,
      comments
    });
  }
  return result;
};

const debounce = (callback, delay) => {
  let timerId;

  return (...rest) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback.apply(this, rest), delay);
  };
};

export {generateImagePosts, generateRandomNumber, debounce};
