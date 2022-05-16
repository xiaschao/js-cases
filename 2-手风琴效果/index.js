// 获取dom元素
var titles = document.querySelectorAll('.fir-menu .title');
var subMenuItemHeight = 40;
var subMenuItemlen = 4;

for (var i = 0; i < titles.length; i++) {
  titles[i].onclick = function () {
    var played = document.querySelector('.sec-menu[status=playing]');
    if (played) return;
    var openedSub = document.querySelector('.sec-menu[status=opened]');
    if (openedSub) closeSubMenu(openedSub);
    toggleMenu(this.nextElementSibling);
  };
}
// 菜单打开
function openSubMenu(secMenu) {
  var to = subMenuItemHeight * subMenuItemlen;
  var status = secMenu.getAttribute('status');
  if (status === 'opened') {
    return;
  }
  secMenu.setAttribute('status', 'playing');
  createAnimation({
    from: 0,
    to: to,
    totalMS: 300,
    onmove: function (n) {
      secMenu.style.height = n + 'px';
    },
    onend: function () {
      secMenu.setAttribute('status', 'opened');
    },
  });
}

// 菜单关闭
function closeSubMenu(secMenu) {
  var from = subMenuItemHeight * subMenuItemlen;
  var status = secMenu.getAttribute('status');
  if (status === 'closed') {
    return;
  }
  secMenu.setAttribute('status', 'playing');
  createAnimation({
    from: from,
    to: 0,
    totalMS: 300,
    onmove: function (n) {
      secMenu.style.height = n + 'px';
    },
    onend: function () {
      secMenu.setAttribute('status', 'closed');
    },
  });
}

// 菜单切换
function toggleMenu(secMenu) {
  var status = secMenu.getAttribute('status');
  if (status === 'playing') return;
  if (status === 'opened') {
    closeSubMenu(secMenu);
  } else {
    openSubMenu(secMenu);
  }
}
