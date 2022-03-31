
export function numDigits(s) {
  return s.replace(/[^0-9]+/g, "").length;
}

export function appendDigit(s, digit) {
  let str = `${s}${digit}`;
  if (!str.includes('.')) {
    str = str.replace(/^0+/, '');
  }
  return str;
}

export function toggleSign(s) {
  if (s.startsWith('-')) {
    return s.substring(1);
  }
  return '-'+s;
}
