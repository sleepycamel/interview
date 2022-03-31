
export function numDigits(s) {
  return s.replace(/[^0-9]+/g, "").length;
}

export function appendDigit(s, digit) {
  return `${s}${digit}`.replace(/^0+/, '');
}
