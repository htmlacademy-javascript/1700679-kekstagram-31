
const isStringLength = (string, strLength) => string.length === strLength;

const isPallindrom = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for(let i = string.length - 1; i >= 0; i--){
    reverseString += string[i];
  }
  return reverseString === string;
};

const getNumbers = (num) => {
  num = num.toString();
  let numStr = num.map((el) => isNaN(Number(el)) ? '' : el);
  if (!numStr.length) {
    numStr += 'NaN';
  }

  return numStr;
};
