function $(selector) {
  return document.querySelector(selector);
}

var menuList = $('.menu-list');
var imageCover = $('.image-cover');
var count = 0;

function init() {
  for (var i = 0; i < data.length; i++) {
    var dom = `<li>
  <a href="#" title="${data[i].title}：${data[i].desc}">
    <span>${data[i].title}</span>
    ${data[i].desc}
  </a>
</li>`;
    menuList.innerHTML += dom;
  }
  change(count);
}

init();

function change(index) {
  imageCover.style.backgroundImage = `url(${data[index].img})`;
  imageCover.style.backgroundColor = data[index].bg;
  var selected = $('.select');
  if (selected) selected.className = '';
  menuList.children[index].querySelector('a').className = 'select';
}

function toNext() {
  count++;
  if (count === data.length) {
    count = 0;
  }
  change(count);
}
var timerId;
function start() {
  if (timerId) return;
  timerId = setInterval(toNext, 1500);
}

function stop() {
  clearInterval(timerId);
  timerId = null;
}

for (let i = 0; i < data.length; i++) {
  menuList.children[i].querySelector('a').addEventListener('mouseenter', function () {
    count = i;
    change(i);
  });
}

start();
$('.right-menu').onmouseenter = stop;
$('.right-menu').onmouseleave = start;
