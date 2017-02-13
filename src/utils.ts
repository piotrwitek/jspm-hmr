export function rightPad(subject: string | number, length: number, symbol: string = ' ') {
  if (subject == null || length <= 0) {
    return '';
  }
  return (subject.toString() + symbol.repeat(length)).slice(-length);
}
