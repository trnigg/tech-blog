module.exports = {
  formatDate: (date) => {
    return date.toLocaleDateString('en-UK', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  },
  preserveLineBreaks: (text) => {
    // see https://www.geeksforgeeks.org/how-to-replace-line-breaks-with-br-tag-using-javascript/
    // essentially replaces newline characters of all operating systems with <br> tags
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>');
  },
};
