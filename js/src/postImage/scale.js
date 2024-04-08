const SCALE_STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const INITIAL_SCALE = 100;

const uploadForm = document.querySelector('.img-upload__form');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const scaleControl = photoEditorForm.querySelector('.scale__control--value');
const previewImage = photoEditorForm.querySelector('.img-upload__preview img');
const scaleControlSmaller = photoEditorForm.querySelector('.scale__control--smaller');
const scaleControlBigger = photoEditorForm.querySelector('.scale__control--bigger');

let scale = INITIAL_SCALE;

const onScaleControlSmallerClick = () => {
  scale -= SCALE_STEP;
  if (scale < MIN_SCALE) {
    scale = MIN_SCALE;
  }
  scaleControl.value = `${scale}%`;
  previewImage.style.transform = `scale(${scale / INITIAL_SCALE})`;
};

const onScaleControlBiggerClick = () => {
  scale += SCALE_STEP;
  if (scale > MAX_SCALE) {
    scale = MAX_SCALE;
  }
  scaleControl.value = `${scale}%`;
  previewImage.style.transform = `scale(${scale / INITIAL_SCALE})`;
};

const initScaleController = () => {
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
};

const destroyScaleController = () => {
  scale = INITIAL_SCALE;
  previewImage.style.transform = `scale(${scale / INITIAL_SCALE})`;
  scaleControl.value = `${scale}%`;
  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
};

export { initScaleController, destroyScaleController };
