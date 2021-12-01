module.exports = {
  pagination: function (data, currentPage, resultPerPage) {
    resultPerPage = resultPerPage || 8;
    currentPage = currentPage || 1;
    let begin = resultPerPage * (currentPage - 1);
    let end = resultPerPage * currentPage;
    return data.slice(begin, end);
  },
};
