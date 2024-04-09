const MIN_GRAYSCALE = 0;
const MAX_GRAYSCALE = 1;
const STEP_GRAYSCALE = 0.1;
const MIN_SEPIA = 0;
const MAX_SEPIA = 1;
const STEP_SEPIA = 0.1;
const MIN_MARVIN = 0;
const MAX_MARVIN = 100;
const STEP_MARVIN = 1;
const MIN_PHOBOS = 0;
const MAX_PHOBOS = 3;
const STEP_PHOBOS = 0.1;
const MIN_HEAT = 1;
const MAX_HEAT = 3;
const STEP_HEAT = 0.1;
const DEFAULT_RANGE_MIN = 0;
const DEFAULT_RANGE_MAX = 100;
const DEFAULT_START = 100;
const DEFAULT_STEP = 1;
const INTEGER_PRECISION = 0;
const DECIMAL_PRECISION = 1;

const uploadForm = document.querySelector('.img-upload__form');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const previewImage = photoEditorForm.querySelector('.img-upload__preview img');
const effectLevel = photoEditorForm.querySelector('.effect-level');
const effectLevelValue = photoEditorForm.querySelector('.effect-level__value');

let effectLevelSlider;

const initEffectSlider = () => {
  effectLevelSlider = document.querySelector('.effect-level__slider');

  if (effectLevelSlider){
    noUiSlider.create(effectLevelSlider, {
      range: {
        min: DEFAULT_RANGE_MIN,
        max: DEFAULT_RANGE_MAX,
      },
      start: DEFAULT_START,
      step: DEFAULT_STEP,
      connect: 'lower',
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(INTEGER_PRECISION);
          }
          return value.toFixed(DECIMAL_PRECISION);
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
        previewImage.style.filter = `brightness(${parseFloat(values[handle])})`;
      } else {
        previewImage.style.filter = '';
      }
    });
  }
};

const effectChangeHandler = (event) => {
  previewImage.className = '';
  previewImage.classList.add(`effects__preview--${event.target.value}`);

  effectLevel.classList.toggle('hidden', event.target.value === 'none');

  if (event.target.value === 'chrome') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: MIN_GRAYSCALE,
        max: MAX_GRAYSCALE,
      },
      start: MAX_GRAYSCALE,
      step: STEP_GRAYSCALE,
    });
  } else if (event.target.value === 'sepia') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: MIN_SEPIA,
        max: MAX_SEPIA,
      },
      start: MAX_SEPIA,
      step: STEP_SEPIA,
    });
  } else if (event.target.value === 'marvin') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: MIN_MARVIN,
        max: MAX_MARVIN,
      },
      start: MAX_MARVIN,
      step: STEP_MARVIN,
    });
  } else if (event.target.value === 'phobos') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: MIN_PHOBOS,
        max: MAX_PHOBOS,
      },
      start: MAX_PHOBOS,
      step: STEP_PHOBOS,
    });
  } else if (event.target.value === 'heat') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: MIN_HEAT,
        max: MAX_HEAT,
      },
      start: MAX_HEAT,
      step: STEP_HEAT,
    });
  } else {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: DEFAULT_RANGE_MIN,
        max: DEFAULT_RANGE_MAX,
      },
      start: DEFAULT_START,
      step: DEFAULT_STEP,
    });
  }
};

const destroySlider = () => {
  if (effectLevelSlider) {
    effectLevelValue.value = DEFAULT_START;
    if (effectLevelSlider.noUiSlider) {
      effectLevelSlider.noUiSlider.set(DEFAULT_START);
      effectLevelSlider.noUiSlider.off('update');
      effectLevelSlider.noUiSlider.destroy();
    }
  }
};

export { initEffectSlider, effectChangeHandler, destroySlider };
