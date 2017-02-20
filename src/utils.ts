export function rightPad(subject: string | number, length: number, symbol: string = ' ') {
  if (subject == null || length <= 0) {
    return '';
  }
  return (subject.toString() + symbol.repeat(length)).slice(-length);
}

export const logger = {
  warning: (message: string) => {
    console.log(`[WARNING] ${message}`);
  },
  debug: (message: string) => {
    console.log(`[DEBUG] ${message}`);
  },
};
