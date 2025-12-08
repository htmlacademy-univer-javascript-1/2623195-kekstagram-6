
const noUiSlider = window.noUiSlider;

const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectsList = document.querySelector('.effects__list');
const imagePreview = document.querySelector('.img-upload__preview img');

const EFFECTS_CONFIG = {
  'effect-none': {
    name: 'none',
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
    start: 100,
  },
  'effect-chrome': {
    name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    start: 1,
  },
  'effect-sepia': {
    name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    start: 1,
  },
  'effect-marvin': {
    name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    start: 100,
  },
  'effect-phobos': {
    name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
    start: 3,
  },
  'effect-heat': {
    name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
    start: 3,
  },
};

let currentEffect = 'effect-none';
let slider = null;

const updateImageEffect = (value) => {
  const config = EFFECTS_CONFIG[currentEffect];

  if (currentEffect === 'effect-none') {
    imagePreview.style.filter = 'none';
    effectLevelContainer.classList.add('hidden');
    return;
  }

  imagePreview.style.filter = `${config.filter}(${value}${config.unit})`;
  effectLevelContainer.classList.remove('hidden');
};

const createSlider = () => {
  if (!effectLevelSlider) {
    return;
  }

  if (slider) {
    slider.destroy();
  }

  const config = EFFECTS_CONFIG[currentEffect];

  noUiSlider.create(effectLevelSlider, {
    range: {
      min: config.min,
      max: config.max,
    },
    start: config.start,
    step: config.step,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });

  slider = effectLevelSlider.noUiSlider;

  slider.on('update', () => {
    const value = slider.get();
    effectLevelValue.value = value;
    updateImageEffect(value);
  });
};

const onEffectChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    currentEffect = evt.target.id;

    const config = EFFECTS_CONFIG[currentEffect];

    if (slider) {
      slider.updateOptions({
        range: {
          min: config.min,
          max: config.max,
        },
        start: config.start,
        step: config.step,
      });
    } else {
      createSlider();
    }

    updateImageEffect(config.start);
    effectLevelValue.value = config.start;
  }
};

const resetEffects = () => {
  currentEffect = 'effect-none';
  const effectNoneRadio = document.querySelector('#effect-none');
  if (effectNoneRadio) {
    effectNoneRadio.checked = true;
  }

  const config = EFFECTS_CONFIG[currentEffect];

  if (slider) {
    slider.updateOptions({
      range: {
        min: config.min,
        max: config.max,
      },
      start: config.start,
      step: config.step,
    });
  } else {
    createSlider();
  }

  updateImageEffect(config.start);
  effectLevelValue.value = config.start;
};

const initEffects = () => {
  if (!noUiSlider) {
    return;
  }

  createSlider();
  effectsList.addEventListener('change', onEffectChange);
  resetEffects();
};

export { initEffects, resetEffects };
