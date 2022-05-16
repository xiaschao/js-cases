var checkAll = document.getElementById('checkAll');
var checkboxs = document.querySelectorAll('.check');
var tbody = document.querySelector('tbody');
var ths = document.querySelectorAll('thead tr th');
var rows = document.querySelectorAll('tbody tr');

checkAll.addEventListener('click', function () {
  // console.log(checkAll.checked);
  for (var i = 0; i < checkboxs.length; i++) {
    checkboxs[i].checked = this.checked;
  }
});

// 通过事件委托的方式进行事件绑定
tbody.addEventListener('click', function (e) {
  // console.log(e.target.tagName);
  if (e.target.tagName !== 'INPUT') return;
  checkAll.checked = getCheckAllStatus();
});

for (var i = 0; i < ths.length; i++) {
  (function (i) {
    ths[i].onclick = function () {
      // console.log(ths[i], i);
      sortTds(i);
    };
  })(i);
}

function getCheckAllStatus() {
  var count = 0;
  for (var i = 0; i < checkboxs.length; i++) {
    if (!checkboxs[i].checked) return false;
    if (checkboxs[i].checked) count++;
  }
  return count === checkboxs.length;
}

function sortTds(index) {
  if (index === 0) return;
  var rowsArr = Array.prototype.slice.call(rows);
  rowsArr.sort((o1, o2) => {
    if (index === 1 || index === 3) {
      return o1.children[index].innerText - o2.children[index].innerText;
    } else {
      return o1.children[index].innerText.localeCompare(o2.children[index].innerText, 'zh');
    }
  });
  // console.log(rowsArr);
  rowsArr.forEach((item) => {
    // console.log(item);
    tbody.appendChild(item);
  });
}
