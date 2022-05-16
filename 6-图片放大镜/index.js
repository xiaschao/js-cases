var mask = document.getElementById('bkc-cover');
var smallCover = document.getElementById('small-cover');
var bigCover = document.querySelector('.bigImg-cover');
var bigCoverImg = document.querySelector('.bigImg-cover img');
var lists = document.querySelectorAll('.navbar li');

smallCover.addEventListener('mouseenter', function () {
  mask.style.display = 'block';
  bigCover.style.visibility = 'visible';
  // 蒙层的宽高
  var smallCoverWidth = mask.offsetWidth;
  var smallCoverHeight = mask.offsetHeight;
  // 盒子的位置
  var smallCoverLeft = this.getBoundingClientRect().left;
  var smallCoverTop = this.getBoundingClientRect().top;
  // 计算最大值
  var maxLeft = this.offsetWidth - smallCoverWidth;
  var maxTop = this.offsetHeight - smallCoverHeight;
  // 计算图片最大移动距离
  var maxImgTop = bigCoverImg.offsetHeight - bigCover.offsetHeight;
  var maxImgLeft = bigCoverImg.offsetWidth - bigCover.offsetWidth;
  smallCover.onmousemove = function (e) {
    // 计算鼠标在盒子内的坐标
    var mouseX = e.pageX - smallCoverLeft;
    var mouseY = e.pageY - smallCoverTop;
    var maskLeft = mouseX - smallCoverWidth / 2;
    var maskTop = mouseY - smallCoverHeight / 2;
    if (maskTop <= 0) maskTop = 0;
    if (maskTop >= maxTop) maskTop = maxTop;
    if (maskLeft <= 0) maskLeft = 0;
    if (maskLeft >= maxLeft) maskLeft = maxLeft;
    mask.style.left = maskLeft + 'px';
    mask.style.top = maskTop + 'px';
    // 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
    var bigCoverLeft = (maskLeft * maxImgLeft) / maxLeft;
    var bigCoverTop = (maskTop * maxImgTop) / maxTop;
    bigCoverImg.style.left = -bigCoverLeft + 'px';
    bigCoverImg.style.top = -bigCoverTop + 'px';
  };

  smallCover.onmouseleave = function () {
    mask.style.display = 'none';
    bigCover.style.visibility = 'hidden';
    smallCover.onmousemove = null;
    smallCover.onmouseleave = null;
  };
});

var imgArr = ['A', 'B', 'C'];
// 默认选中第一个
lists[0].style.outline = '1px #008c8c solid';
for (let i = 0; i < lists.length; i++) {
  lists[i].onclick = function () {
    for (let i = 0; i < lists.length; i++) {
      lists[i].style.outline = 'none';
    }
    this.style.outline = '1px #008c8c solid';
    smallCover.querySelector('img').src = `./images/img${imgArr[i]}_2.jpg`;
    bigCoverImg.src = `./images/img${imgArr[i]}_3.jpg`;
  };
}
