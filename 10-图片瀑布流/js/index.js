let waterfallFlow = document.querySelector('.waterfall-flow');
let imagesUrl = []; // 图片地址
let imgWidth = 220;
for (let i = 0; i <= 40; i++) {
  imagesUrl.push(`./images/${i}.jpg`);
}
// 初始化页面
for (let i = 0; i < imagesUrl.length; i++) {
  let li = document.createElement('li');
  li.className = 'list';
  let img = document.createElement('img');
  img.src = imagesUrl[i];
  img.style.width = imgWidth + 'px';
  li.style.width = imgWidth + 'px';
  waterfallFlow.appendChild(li);
  li.appendChild(img);
  img.onload = reflow;
}

window.addEventListener('resize', debounce(reflow, 800));

function reflow() {
  let waterfallFlowWidth = waterfallFlow.clientWidth; // 容器的宽度
  let listNum = Math.floor(waterfallFlowWidth / imgWidth); // 列数
  let gapX = (waterfallFlowWidth - imgWidth * listNum) / (listNum + 1);
  let gapY = 15;
  let listArr = new Array(listNum).fill(gapY); // 每一列的高度
  for (let i = 0; i < waterfallFlow.children.length; i++) {
    let list = waterfallFlow.children[i];
    var minListIndex = listArr.indexOf(Math.min.apply(null, listArr));
    let left = minListIndex * (imgWidth + gapX) + gapX;
    list.style.left = left + 'px';
    let top = listArr[minListIndex];
    list.style.top = top + 'px';
    listArr[minListIndex] += list.clientHeight + gapY;
  }
  waterfallFlow.style.height = Math.max.apply(null, listArr) + 'px';
}

function debounce(fn, deplay) {
  var timeId;
  return function () {
    var arg = Array.prototype.slice.call(arguments);
    clearTimeout(timeId);
    timeId = setTimeout(function () {
      fn.apply(this, arg);
    }, deplay);
  };
}
