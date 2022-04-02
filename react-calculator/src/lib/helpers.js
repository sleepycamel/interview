import {READOUT_MAX_DIGITS, KEYS_TO_BUTTON} from "./constants";

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

export function getFloatReadout(s) {
  let readout = formatWithCommas(s);
  if (!readout.includes('.')) readout += '.';
  return readout;
}

// Formats numeric string with commas like toLocaleString() but preserves trailing zeros after decimal
export function formatWithCommas(s) {
  const parts = s.split(".");
  const numberPart = parts[0];
  const decimalPart = parts[1];
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
}

export function keyToAction(key) {
  let action = null;
  if ('0123456789'.includes(key)) {
    action = ['number', `num${key}`, parseInt(key)];
  } else if (key === '.') {
    action = ['number', 'point', key];
  } else if ('+-*/'.includes(key)) {
    action = ['operator', KEYS_TO_BUTTON[key], key];
  } else if (key === 'Enter') {
    action = ['operator', 'equal', '='];
  }
  return action;
}

export function toPercentDecimalStr(accumulator) {
  const floatval = (parseFloat(accumulator)/100).toFixed(READOUT_MAX_DIGITS);
  return floatval.toString().replace(/0+$/, '');
}
