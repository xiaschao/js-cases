/**
 * 创建分页组件
 * @param {当前页码} option.page
 * @param {总页码数} option.totalPage
 * @param {展示页码最大数} option.pageNum
 * @param {放入容器} option.container
 */
function createPagination(option) {
  option.container.innerHTML = '';
  let pagination = document.createElement('div');
  let sideLeftClassName = '';
  if (option.page === 1) {
    sideLeftClassName = 'disable';
  }
  createAnchor(sideLeftClassName, '首页', 1);
  createAnchor(sideLeftClassName, '上一页', option.page - 1);

  let minPageNum = option.page - Math.floor(option.pageNum / 2);
  if (minPageNum < 1) minPageNum = 1;
  if (minPageNum > option.totalPage - option.pageNum + 1) {
    minPageNum = option.totalPage - option.pageNum + 1;
  }
  let maxPageNum = minPageNum + option.pageNum - 1;
  for (let i = minPageNum; i <= maxPageNum; i++) {
    let pageClassName = '';
    if (i === option.page) pageClassName = 'active';
    createAnchor(pageClassName, i, i);
  }

  let sideRightClassName = '';
  if (option.page === option.totalPage) {
    sideRightClassName = 'disable';
  }
  createAnchor(sideRightClassName, '下一页', option.page + 1);
  createAnchor(sideRightClassName, '尾页', option.totalPage);

  let span = document.createElement('span');
  span.innerText = `${option.page}/${option.pageNum}`;
  pagination.appendChild(span);
  option.container.appendChild(pagination);

  /**
   * 创建页码
   * @param {样式类} className
   * @param {填充文本} text
   * @param {点击跳转哪一页} newPage
   */
  function createAnchor(className, text, newPage) {
    let a = document.createElement('a');
    a.href = '#';
    a.className = className;
    a.innerText = text;
    a.onclick = function () {
      // console.log('我执行了');
      if (newPage === option.page || newPage > option.totalPage || newPage < 1 || !newPage) return;
      createPagination({
        page: newPage,
        totalPage: 50,
        pageNum: 10,
        container: container,
      });
    };
    pagination.appendChild(a);
  }
}
