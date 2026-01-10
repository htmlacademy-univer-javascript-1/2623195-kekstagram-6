const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

let scaleInput, scaleSmaller, scaleBigger, imagePreview;

const form = document.querySelector('.img-upload__form');

const getScaleElements = () => {
  if (form) {
    scaleInput = form.querySelector('.scale__control--value');
    scaleSmaller = form.querySelector('.scale__control--smaller');
    scaleBigger = form.querySelector('.scale__control--bigger');
    imagePreview = form.querySelector('.img-upload__preview img');
  }
};

const updateImageScale = () => {
  if (!imagePreview) {
    return;
  }

  const scaleValue = parseInt(scaleInput.value, 10);

  if (isNaN(scaleValue)) {
    scaleInput.value = SCALE_DEFAULT;
    imagePreview.style.transform = `scale(${SCALE_DEFAULT / 100})`;
    return;
  }

  const scale = scaleValue / 100;
  imagePreview.style.transform = `scale(${scale})`;

  scaleInput.title = `Image Scale: ${scaleValue}%`;
};

const onScaleSmallerClick = () => {
  let currentValue = parseInt(scaleInput.value, 10);
  currentValue -= SCALE_STEP;

  if (currentValue < SCALE_MIN) {
    currentValue = SCALE_MIN;
  }

  scaleInput.value = currentValue;
  updateImageScale();
};

const onScaleBiggerClick = () => {
  let currentValue = parseInt(scaleInput.value, 10);
  currentValue += SCALE_STEP;

  if (currentValue > SCALE_MAX) {
    currentValue = SCALE_MAX;
  }

  scaleInput.value = currentValue;
  updateImageScale();
};

const resetScale = () => {
  scaleInput.value = SCALE_DEFAULT;
  updateImageScale();
};

const initScale = () => {
  getScaleElements();

  if (!scaleInput || !scaleSmaller || !scaleBigger || !imagePreview) {
    return;
  }

  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);

  scaleInput.setAttribute('readonly', 'readonly');

  scaleInput.min = SCALE_MIN;
  scaleInput.max = SCALE_MAX;
  scaleInput.step = SCALE_STEP;

  scaleInput.value = SCALE_DEFAULT;

  updateImageScale();
};

export { initScale, resetScale };
