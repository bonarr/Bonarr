import filesize from 'filesize';

function formatBytes(input) {
  var size = Number(input);

  if (isNaN(size)) {
    return '';
  }

  return filesize(size, {
    base: 2,
    round: 1
  });
}

export default formatBytes;
