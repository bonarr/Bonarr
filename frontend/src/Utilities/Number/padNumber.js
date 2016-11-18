function padNumber(input, width, paddingCharacter = 0) {
  if (!input) {
    return '';
  }

  input = `${input}`;
  return input.length >= width ? input : new Array(width - input.length + 1).join(paddingCharacter) + width;
}

export default padNumber;
