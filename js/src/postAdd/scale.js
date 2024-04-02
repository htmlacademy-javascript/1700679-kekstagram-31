const uploadForm = document.querySelector('.img-upload__form');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const scaleControl = photoEditorForm.querySelector('.scale__control--value');
const previewImage = photoEditorForm.querySelector('.img-upload__preview img');
const scaleControlSmaller = photoEditorForm.querySelector('.scale__control--smaller');
const scaleControlBigger = photoEditorForm.querySelector('.scale__control--bigger');

let scale = 100;

const initScaleController = () => {
  scaleControlSmaller.addEventListener('click', handleScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', handleScaleControlBiggerClick);
};

const destroyScaleController = () => {
  scale = 100;
  previewImage.style.transform = `scale(${scale / 100})`;
  scaleControl.value = `${scale}%`;
  scaleControlSmaller.removeEventListener('click', handleScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', handleScaleControlBiggerClick);
}

function handleScaleControlSmallerClick() {
  scale -= 25;
  if (scale < 25) {
    scale = 25;
  }
  scaleControl.value = `${scale}%`;
  previewImage.style.transform = `scale(${scale / 100})`;
}

function handleScaleControlBiggerClick() {
  scale += 25;
  if (scale > 100) {
    scale = 100;
  }
  scaleControl.value = `${scale}%`;
  previewImage.style.transform = `scale(${scale / 100})`;
}

export { initScaleController, destroyScaleController };
