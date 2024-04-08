import {debounce, generateRandomNumber} from './util';
import createThumbnails from './thumbnails';

const DELAY = 500;
const THUMBNAILS_RANDOM_SORT_COUNT_MAX = 10;
const THUMBNAILS_RANDOM_SORT_COUNT_MIN = 0;
const DEFAULT_FILTER = 'filter-default';

const filtersTemplate = document.querySelector('.img-filters');
const filterButtons = filtersTemplate.querySelectorAll('.img-filters__button');

let currentFilter = DEFAULT_FILTER;
let initialPosts;

const shufflePosts = (posts) => {
  for (let i = posts.length - 1; i > 0; i--) {
    const randomIndex = generateRandomNumber(0, i);
    [posts[randomIndex], posts[i]] = [posts[i], posts[randomIndex]];
  }
  return posts.slice(THUMBNAILS_RANDOM_SORT_COUNT_MIN, THUMBNAILS_RANDOM_SORT_COUNT_MAX);
};

const sortByComments = (posts) => posts.sort((firstPost, secondPost) => secondPost.comments.length - firstPost.comments.length);

const applyFilter = (filterName, posts) => {
  let filteredPosts;

  switch (filterName) {
    case 'filter-default':
      filteredPosts = initialPosts;
      break;
    case 'filter-random':
      filteredPosts = shufflePosts([...posts]);
      break;
    case 'filter-discussed':
      filteredPosts = sortByComments([...posts]);
      break;
    default:
      throw new Error(`Filter ${filterName} does not exist`);
  }

  debounce(() => createThumbnails(filteredPosts), DELAY)();
};

const onFilterButtonClick = (event, posts) => {
  const currentActiveButton = document.querySelector('.img-filters__button--active');
  if (currentActiveButton) {
    currentActiveButton.classList.remove('img-filters__button--active');
  }
  event.target.classList.add('img-filters__button--active');

  currentFilter = event.target.id;
  applyFilter(currentFilter, posts);
};

const initThumbnailsSorting = (posts) => {
  if (!Array.isArray(posts)) {
    throw new Error('Posts must be an array');
  }
  initialPosts = posts;
  filtersTemplate.classList.remove('img-filters--inactive');
  filterButtons.forEach((button) => {
    button.addEventListener('click', (event) => onFilterButtonClick(event, posts));
  });
};

export default initThumbnailsSorting;
