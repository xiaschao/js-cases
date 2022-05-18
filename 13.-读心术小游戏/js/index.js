function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
let rightUl = document.querySelector('.right');
let specialNum = getRandom(0, 16);
let cover = document.querySelector('.cover');
let coverImg = cover.querySelector('img');

function init() {
  for (let i = 0; i < 100; i++) {
    let li = document.createElement('li');
    li.className = 'right-item';
    let span = document.createElement('span');
    span.innerText = i;
    let img = document.createElement('img');
    if (i % 9 === 0) {
      img.src = `./images/values/${specialNum}.png`;
    } else {
      img.src = `./images/values/${getRandom(0, 16)}.png`;
    }
    li.appendChild(span);
    li.appendChild(img);
    rightUl.appendChild(li);
  }
}
init();

function clickEvent() {
  cover.style.transition = ' all 1s';
  cover.style.transform = 'rotate(1800deg)';
  cover.addEventListener('transitionend', function () {
    coverImg.src = `./images/values/${specialNum}.png`;
  });
}
coverImg.onclick = clickEvent;
