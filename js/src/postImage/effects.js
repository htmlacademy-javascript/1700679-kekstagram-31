import { initEffectSlider, effectChangeHandler, destroySlider } from './effectSlider.js';

const DEFAULT_EFFECT = 'none';

const uploadForm = document.querySelector('.img-upload__form');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const effectItems = uploadForm.querySelectorAll('.effects__radio');
const effectLevel = uploadForm.querySelector('.effect-level');

let currentEffect = DEFAULT_EFFECT;

const updateEffect = (event) => {
  currentEffect = event.target.value;
  previewImage.className = '';
  previewImage.classList.add(`effects__preview--${currentEffect}`);
  effectLevel.classList.toggle('hidden', currentEffect === 'none');
  effectChangeHandler(event);
};

const initEffectController = () => {
  destroySlider();
  initEffectSlider();
  effectLevel.classList.add('hidden');
  effectItems.forEach((item) => {
    item.addEventListener('change', updateEffect);
  });
};

const destroyEffectController = () => {
  effectItems.forEach((item) => {
    item.removeEventListener('change', updateEffect);
    item.checked = item.value === 'none';
  });
  previewImage.classList.remove(`effects__preview--${currentEffect}`);
  destroySlider();
};

export { initEffectController, destroyEffectController };
