function createAnimation(options) {
  let from = options.from;
  let to = options.to;
  let totalMS = options.totalMS || 1000; // 动画总时间
  let duration = options.duration || 15; // 变化一次的时间
  let times = Math.floor(totalMS / duration); // 改变次数
  let dis = (to - from) / times; // 每一次改变的值
  let count = 0; // 当前已经改变次数
  let timerId = setInterval(function () {
    from += dis;
    count++;
    if (count >= times) {
      from = to;
      clearInterval(timerId);
      options.onmove && options.onmove(from);
      options.onend && options.onend();
      return;
    }
    options.onmove && options.onmove(from);
  }, duration);
}
