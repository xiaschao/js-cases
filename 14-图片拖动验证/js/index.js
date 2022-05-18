const tip = document.querySelector('.tip');
const imgBox = document.querySelector('.imgBox');
const imgDrag = document.querySelector('.imgDrag');
const imgGap = document.querySelector('.imgGap');
const title = document.querySelector('.main h3');
const sliderSpan = document.querySelector('.slider span');
const sliderBtn = document.getElementById('btn');
const slider = document.querySelector('.slider');
const main = document.querySelector('.main');

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const imgUrls = ['t1.png', 't2.png', 't3.png', 't4.png', 't5.png'];

function init() {
  let imgExhibit = imgUrls[getRandom(0, imgUrls.length)]; //展示的图片
  imgBox.style.background = `url(./img/${imgExhibit}) no-repeat`;
  imgDrag.style.background = `url(./img/${imgExhibit}) no-repeat`;
  let imgGapLeft = getRandom(
    imgBox.clientWidth / 2 + 20,
    imgBox.clientWidth - imgGap.clientWidth - 10
  );
  let imgGapTop = getRandom(30, imgBox.clientHeight - imgGap.clientHeight - 10);
  imgGap.style.left = imgGapLeft + 'px';
  imgGap.style.top = imgGapTop + 'px';
  imgDrag.style.top = imgGapTop + 'px';
  imgDrag.style.backgroundPositionX = -imgGapLeft + 'px';
  imgDrag.style.backgroundPositionY = -imgGapTop + 'px';
}
init();

function bindEvent() {
  tip.onclick = function () {
    init();
    sliderBtn.style.transition = 'left 0.5s';
    sliderBtn.style.left = -2 + 'px';
    imgDrag.style.transition = 'left 0.5s';
    imgDrag.style.left = 0;
  };
  sliderBtn.onmousedown = function (e) {
    imgDrag.style.display = 'block';
    sliderBtn.style.transition = 'none';
    imgDrag.style.transition = 'none';
    let distance = e.offsetX;
    let btnX = sliderBtn.getBoundingClientRect().left;
    let maxPositionX = imgBox.clientWidth - imgDrag.clientWidth;
    main.onmousemove = function (e) {
      sliderSpan.style.opacity = 0;
      let positionX = e.clientX - btnX - distance;
      if (positionX >= maxPositionX) positionX = maxPositionX;
      if (positionX <= -2) positionX = -2;
      sliderBtn.style.left = positionX + 'px';
      imgDrag.style.left = positionX + 'px';
    };
    window.onmouseup = function () {
      main.onmousemove = null;
      if (isApproved()) {
        // console.log('通过了验证');
        title.innerText = '通过了验证';
        title.style.color = 'green';
        sliderBtn.onmousedown = null;
        tip.onclick = null;
      } else {
        // console.log('没通过验证');
        title.innerText = '没通过验证';
        title.style.color = 'red';
        sliderBtn.style.transition = 'left 0.5s';
        sliderBtn.style.left = -2 + 'px';
        imgDrag.style.transition = 'left 0.5s';
        imgDrag.style.left = 0;
        sliderSpan.style.opacity = 1;
        sliderBtn.addEventListener('transitionend', function () {
          title.innerText = '请完成图片验证';
          title.style.color = 'black';
        });
      }
    };
  };
}
bindEvent();

// 判断是否通过了验证
function isApproved() {
  let imgDragLeft = imgDrag.getBoundingClientRect().left;
  let imgGapLeft = imgGap.getBoundingClientRect().left;
  let errorDis = 3;
  // console.log(imgDragLeft, imgGapLeft);
  return imgDragLeft <= imgGapLeft + errorDis && imgDragLeft >= imgGapLeft - errorDis;
}
