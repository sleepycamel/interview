
export const READOUT_MAX_FONTSIZE = 75;
export const maxDigits = 9;

export const BUTTONS_TO_OP = {
  add: '+',
  subtract: '-',
  multiply: '*',
  divide: '/'
}

export const KEYS_TO_BUTTON = Object.fromEntries(Object.entries(BUTTONS_TO_OP).map(a => a.reverse()));


