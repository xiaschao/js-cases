var secondSingle = $('.second-single'); // 秒
var secondTen = $('.second-ten'); // 秒十位
var minuteSingle = $('.minute-single'); // 分
var minuteTen = $('.minute-ten'); // 分十位
var hourSingle = $('.hour-single'); // 小时
var hourTen = $('.hour-ten'); // 小时十位
var timeCover = $('.time-cover');
var heightCover = timeCover.clientHeight;

changeTime(secondSingle, 1000);
changeTime(secondTen, 1000 * 10);
changeTime(minuteSingle, 1000 * 60);
changeTime(minuteTen, 1000 * 60 * 10);
changeTime(hourSingle, 1000 * 60 * 60);
changeTime(hourTen, 1000 * 60 * 60 * 10);

// 函数区域
function $(selector) {
  return document.querySelector(selector);
}

function changeTime(changeDom, timer) {
  setInterval(function () {
    var firstNode = changeDom.children[0];
    // console.log(firstNode);
    changeDom.style.transition = 'top .5s linear';
    changeDom.style.top = -heightCover + 'px';
    changeDom.addEventListener('transitionend', function () {
      changeDom.style.transition = '';
      changeDom.style.top = '0px';
      changeDom.appendChild(firstNode);
    });
  }, timer);
}
