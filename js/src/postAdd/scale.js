const uploadForm = document.querySelector('.img-upload__form');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const scaleControl = photoEditorForm.querySelector('.scale__control--value');
const previewImage = photoEditorForm.querySelector('.img-upload__preview img');

let scale = 100;

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

export { handleScaleControlSmallerClick, handleScaleControlBiggerClick };
