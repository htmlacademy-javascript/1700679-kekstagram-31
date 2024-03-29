const uploadForm = document.querySelector('.img-upload__form');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const previewImage = photoEditorForm.querySelector('.img-upload__preview img');
const effectLevel = photoEditorForm.querySelector('.effect-level');
const effectLevelValue = photoEditorForm.querySelector('.effect-level__value');


let effectLevelSlider;

function initEffectSlider() {
  effectLevelSlider = document.querySelector('.effect-level__slider');

  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });

  effectLevelSlider.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];

    if (previewImage.classList.contains('effects__preview--chrome')) {
      previewImage.style.filter = `grayscale(${values[handle]})`;
    } else if (previewImage.classList.contains('effects__preview--sepia')) {
      previewImage.style.filter = `sepia(${values[handle]})`;
    } else if (previewImage.classList.contains('effects__preview--marvin')) {
      previewImage.style.filter = `invert(${values[handle]}%)`;
    } else if (previewImage.classList.contains('effects__preview--phobos')) {
      previewImage.style.filter = `blur(${values[handle]}px)`;
    } else if (previewImage.classList.contains('effects__preview--heat')) {
      previewImage.style.filter = `brightness(${parseFloat(values[handle]) + 1})`;
    } else {
      previewImage.style.filter = '';
    }
  });
}

function effectChangeHandler(event) {
  previewImage.className = '';
  previewImage.classList.add(`effects__preview--${event.target.value}`);

  effectLevel.classList.toggle('hidden', event.target.value === 'none');

  if (event.target.value === 'chrome') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  } else if (event.target.value === 'sepia') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  } else if (event.target.value === 'marvin') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  } else if (event.target.value === 'phobos') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  } else if (event.target.value === 'heat') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  } else {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }
}

export { initEffectSlider, effectChangeHandler };
