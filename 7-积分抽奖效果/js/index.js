// 获取带index属性的li
var items = document.querySelectorAll('.lottery li[index]');
var itemsArr = Array.prototype.slice.call(items);
itemsArr.sort((o1, o2) => o1.getAttribute('index') - o2.getAttribute('index'));
// console.log(itemsArr);
var timerId;
// 获取开始抽奖按钮
var startBtn = document.querySelector('#start-area button');
var lotteryTimesSpan = document.getElementById('lottery-times');
var lotteryTimes = 5; //抽奖次数
lotteryTimesSpan.innerHTML = lotteryTimes;
var mask = document.querySelector('.mask');
var tipContent = document.querySelector('.mask .tip-content p');
var tipBtn = document.querySelector('.mask .tip-content button');
var closeBtn = document.querySelector('#cha');

startBtn.onclick = startLottery;
tipBtn.onclick = function () {
  startLottery();
  // console.log(lotteryTimes);
  mask.style.display = 'none';
  var selected = document.querySelector('.lottery .select');
  if (selected) selected.classList.remove('select');
};
closeBtn.onclick = function () {
  mask.style.display = 'none';
  var selected = document.querySelector('.lottery .select');
  if (selected) selected.classList.remove('select');
};

// 函数区域
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// 开始抽奖
function startLottery() {
  var award = getRandom(1, 9); //奖品的index
  // console.log(award);
  if (timerId) return;
  var index = 0;
  var awardIndex = 0;
  if (award === 8) award = 0;
  timerId = setInterval(function () {
    var selected = document.querySelector('.lottery .select');
    if (selected) selected.classList.remove('select');
    itemsArr[index].classList.add('select');
    index++;
    awardIndex++;
    // console.log(index, awardIndex);
    if (index === itemsArr.length) index = 0;
    if (awardIndex / itemsArr.length >= getRandom(3, 5) && awardIndex % itemsArr.length === award) {
      stop(award);
    }
  }, 50);
  lotteryTimes--;
  lotteryTimesSpan.innerHTML = lotteryTimes;
  if (lotteryTimes === 0) {
    startBtn.onclick = null;
    tipBtn.innerHTML = '确定';
    tipBtn.onclick = function () {
      mask.style.display = 'none';
      var selected = document.querySelector('.lottery .select');
      if (selected) selected.classList.remove('select');
    };
  }
}

function stop(award) {
  clearInterval(timerId);
  timerId = null;
  mask.style.display = 'block';
  if (award === 0) award = 8;
  if (award === 5) {
    tipContent.innerHTML = '没有抽到奖品哦~~~';
  } else {
    tipContent.innerHTML = `恭喜您获得${itemsArr[award - 1].querySelector('span').innerText}`;
  }
}
