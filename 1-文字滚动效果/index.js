function $(selector) {
  return document.querySelector(selector);
}
//初始化
var content = $('.content');
var intervalTime = 1500;
var distance = 0;
var disHeight = 30;
/**
 * 将第一个元素复制到最后
 */
function cloneFirstItem() {
  var firstItem = content.children[0];
  content.append(firstItem.cloneNode(true));
}

cloneFirstItem();

/**
 * 每隔一段时间滚动
 */
// 间隔时间
setInterval(downRoll, intervalTime);

/**
 * 向下滚动一段距离
 */
function downRoll() {
  var from = distance; // 开始
  distance += disHeight;
  var to = distance; // 结束
  var disTime = 20; // 分为 20 步
  var step = (to - from) / disTime; // 步长
  var timerId = setInterval(function () {
    from += step;
    if (from >= to) {
      clearInterval(timerId);
    }
    content.scrollTop = from;
  }, disTime);
  if (distance === disHeight * 3) {
    distance = 0;
  }
}
