module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString('en-UK', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  },
};
