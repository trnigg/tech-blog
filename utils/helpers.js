module.exports = {
  format_date: (date) => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    return date.toLocaleDateString('en-UK');
  },
};
