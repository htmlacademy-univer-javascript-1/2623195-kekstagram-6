// Функция для проверки длины строки
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

// Функция для проверки палиндрома
function isPalindrome(string) {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  let reversedString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  return normalizedString === reversedString;
}
