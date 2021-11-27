module.exports = {
  pagination: function (data, currentPage) {
    currentPage = currentPage || 1;
    let resultPerPage = 8;
    let begin = resultPerPage * (currentPage - 1);
    let end = resultPerPage * currentPage;
    return data.slice(begin, end);
  },
};
