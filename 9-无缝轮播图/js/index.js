// 图片地址
let images = [
  './img/Wallpaper1.jpg',
  './img/Wallpaper2.jpg',
  './img/Wallpaper3.jpg',
  './img/Wallpaper4.jpg',
  './img/Wallpaper5.jpg',
];
// 获取dom
let doms = {
  container: document.querySelector('.carousel-container'),
  carouselList: document.querySelector('.carousel-list'),
  indicator: document.querySelector('.indicator'),
  arrowLeft: document.querySelector('.arrow-left'),
  arrowRight: document.querySelector('.arrow-right'),
};
let curIndex = 0; // 当前图片索引
let timerId;
let isPlaying = false; // 是否在切换动画

init();
bindEvent();
// 函数区
/**
 * 页面初始化
 */
function init() {
  for (let i = 0; i < images.length; i++) {
    doms.carouselList.innerHTML += `<li><img src=${images[i]} alt=""></li>`;
    doms.indicator.innerHTML += '<li></li>';
  }
  let firstNode = doms.carouselList.children[0].cloneNode(true);
  doms.carouselList.appendChild(firstNode);
  doms.carouselList.style.width = `${doms.carouselList.children.length}00%`;
  setIndicatorStatus();
}
/**
 * 设置指示器的状态
 */
function setIndicatorStatus() {
  let actived = document.querySelector('.carousel-container .indicator .active');
  if (actived) actived.classList.remove('active');
  let activeIndex = curIndex;
  if (activeIndex === images.length) activeIndex = 0;
  doms.indicator.children[activeIndex].className = 'active';
}

/**
 * 切换指定image
 */
function changeItem(index, onend) {
  if (isPlaying || index === curIndex) {
    return;
  }
  isPlaying = true;
  createAnimation({
    from: parseFloat(doms.carouselList.style.marginLeft) || 0,
    to: -doms.container.clientWidth * index,
    totalMS: 300,
    onmove: function (n) {
      doms.carouselList.style.marginLeft = n + 'px';
    },
    onend: function () {
      isPlaying = false;
      onend && onend();
    },
  });
  curIndex = index;
  setIndicatorStatus();
}

/**
 * 开启定时器
 */
function start() {
  if (timerId) return;
  timerId = setInterval(toNext, 2000);
}

/**
 * 关闭定时器
 */
function stop() {
  clearInterval(timerId);
  timerId = null;
}

/**
 * 切换下一张图片
 */
function toNext() {
  let newIndex = curIndex + 1;
  let onend;
  if (newIndex === images.length) {
    onend = function () {
      doms.carouselList.style.marginLeft = 0;
      curIndex = 0;
    };
  }
  changeItem(newIndex, onend);
}
/**
 *切换回上一张图片
 */
function toLast() {
  let newIndex = curIndex - 1;
  if (newIndex < 0) {
    newIndex = images.length - 1;
    doms.carouselList.style.marginLeft = -doms.container.clientWidth * images.length + 'px';
  }
  changeItem(newIndex);
}

/**
 * 绑定事件
 */
function bindEvent() {
  let lists = doms.indicator.children;
  for (let i = 0; i < lists.length; i++) {
    lists[i].onclick = function () {
      changeItem(i);
    };
  }
  start();
  doms.container.addEventListener('mouseenter', function () {
    stop();
    doms.container.onmouseleave = start;
  });
  doms.arrowRight.onclick = toNext;
  doms.arrowLeft.onclick = toLast;
}
