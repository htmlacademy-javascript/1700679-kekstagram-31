import { debounce, generateRandomNumber } from './util';
import { createThumbnails } from './thumbnails';

const filtersTemplate = document.querySelector('.img-filters');
const filterButtons = filtersTemplate.querySelectorAll('.img-filters__button');
let currentFilter = 'filter-default';
const DELAY = 500;
let initialPosts;

const shufflePosts = (posts) => {
  for (let i = posts.length - 1; i > 0; i--) {
    const randomIndex = generateRandomNumber(0, i);
    [posts[randomIndex], posts[i]] = [posts[i], posts[randomIndex]];
  }
  return posts.slice(0, 10);
};

const sortByComments = (posts) => posts.sort((a, b) => b.comments.length - a.comments.length);

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

  applyFilter(currentFilter, initialPosts);
};

export default initThumbnailsSorting;
