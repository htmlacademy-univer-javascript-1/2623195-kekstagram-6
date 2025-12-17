const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const isEscapeKey = (evt) => evt.key === Keys.ESCAPE || evt.key === Keys.ESC;

const toggleClass = (element, className = '') => {
  if (element) {
    element.classList.toggle(className);
  }
};

const numDecline = (num, nominative, genitiveSingular,genitivePlural) => {
  if (num > 10 && (Math.round((num % 100) / 10)) === 1) {
    return genitivePlural;
  }
  switch (num % 10) {
    case 1: return nominative;
    case 2:
    case 3:
    case 4: return genitiveSingular;
  }
  return genitivePlural;
};

export { isEscapeKey, toggleClass, numDecline };
