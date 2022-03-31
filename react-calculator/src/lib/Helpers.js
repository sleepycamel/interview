
export function numDigits(s) {
  return s.replace(/[^0-9]+/g, "").length;
}

export function appendDigit(s, digit) {
  return `${s}${digit}`.replace(/^0+/, '');
}

export function toggleSign(s) {
  if (s.startsWith('-')) {
    return s.substring(1);
  }
  return '-'+s;
}
