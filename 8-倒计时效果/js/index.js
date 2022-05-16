var secondSingle = $('.second-single'); // 秒
var secondTen = $('.second-ten'); // 秒十位
var minuteSingle = $('.minute-single'); // 分
var minuteTen = $('.minute-ten'); // 分十位
var hourSingle = $('.hour-single'); // 小时
var hourTen = $('.hour-ten'); // 小时十位
var timeCover = $('.time-cover');
var heightCover = timeCover.clientHeight;

// 函数区域
function $(selector) {
  return document.querySelector(selector);
}
function changeTime(changeDom, timer) {
  var firstNode = changeDom.children[0];
  console.log(firstNode);
  changeDom.style.transition = 'top .5s linear';
  changeDom.style.top = -heightCover + 'px';
  changeDom.addEventListener('transitionend', function () {
    changeDom.style.transition = '';
    changeDom.appendChild(firstNode);
  });
}
changeTime(secondSingle);
