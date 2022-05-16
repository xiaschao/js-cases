function createAnimation(options) {
  var from = options.from;
  var to = options.to;
  var totalMS = options.totalMS || 1000; // 变化的总毫秒数
  var duration = options.duration || 15; // 动画间隔时间
  var times = Math.floor(totalMS / duration); // 变化总次数
  var num = 0; // 已经变化了多少次
  var dis = (to - from) / times; // 变化一次的值
  var timeId = setInterval(function () {
    from += dis;
    num++;
    if (num >= times) {
      from = to;
      clearInterval(timeId);
      // if (options.onend) {
      //   options.onend();
      // } ==> 相当于
      options.onend && options.onend();
    }
    options.onmove && options.onmove(from);
  }, duration);
}
