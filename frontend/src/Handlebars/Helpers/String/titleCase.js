const titleCase = function(input) {
  if (!input) {
    return '';
  }

  return input.replace(/\w\S*/g, function(match) {
    return match.charAt(0).toUpperCase() + match.substr(1).toLowerCase();
  });
};

module.exports = titleCase;
