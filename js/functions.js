
const isStringLength = (string, strLength) => string.length <= strLength;

console.log(isStringLength('проверяемая   строка', 20));
console.log(isStringLength('проверяемая строка', 10));

const isPallindrom = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for(let i = string.length - 1; i >= 0; i--){
    reverseString += string[i];
  }
  return reverseString === string;
};

console.log(isPallindrom("топот"));
console.log(isPallindrom("ДовОд"));
console.log(isPallindrom('Лёша на полке клопа нашёл'));
console.log(isPallindrom('Лёша на полке клопа нл'));

const getNumbers = (num) => {
  num = num.toString().replaceAll(' ', '').split('');
  let numStr = num.map((el) => isNaN(Number(el)) ? '' : el);
  numStr = numStr.join('');
  if (!numStr.length) {
    numStr += 'NaN';
  }

  return numStr;
};

console.log(getNumbers('2023 год'));
console.log(getNumbers('а я томат'));

console.log(getNumbers(2023));
console.log(getNumbers(-1));
console.log(getNumbers(1.5));
