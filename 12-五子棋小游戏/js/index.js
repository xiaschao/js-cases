const rowNum = 14; // 棋盘行数
let container = document.getElementById('container');
let step = 1;
let squareWidth; // 方格宽度
let pieceCoordinateArr = []; // 存储棋子

// 封装获取dom方法
function $(selector) {
  return document.querySelector(selector);
}

/**
 * 初始化棋盘
 */
function init() {
  const table = document.createElement('table');
  table.className = 'checkerboard';
  const tbody = document.createElement('tbody');
  for (let i = 0; i < rowNum; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < rowNum; j++) {
      let td = document.createElement('td');
      td.setAttribute('data-row', i);
      td.setAttribute('data-column', j);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  container.appendChild(table);
  squareWidth = $('td').clientWidth;
}
init();

/**
 * 创建棋子
 */
function createPiece() {
  let piece = document.createElement('div');
  piece.className = 'piece';
  if (step % 2 === 1) piece.setAttribute('player', 'black');
  if (step % 2 === 0) piece.setAttribute('player', 'white');
  return piece;
}

/**
 * 绑定事件
 */
function bindEvent() {
  $('.checkerboard').onclick = function (e) {
    if (e.target.tagName != 'TD') return;
    let tempObj = Object.assign({}, e.target.dataset);
    // console.log(tempObj);
    let isChangeX = e.offsetX > squareWidth / 2;
    let isChangeY = e.offsetY > squareWidth / 2;
    let positionX = isChangeX ? parseInt(tempObj.column) + 1 : parseInt(tempObj.column);
    let positionY = isChangeY ? parseInt(tempObj.row) + 1 : parseInt(tempObj.row);
    // console.log(positionX, positionY);
    let piece = createPiece();
    piece.style.left = isChangeX ? '50%' : '-50%';
    piece.style.top = isChangeY ? '50%' : '-50%';
    piece.setAttribute('x', positionX);
    piece.setAttribute('y', positionY);

    let existRes = pieceCoordinateArr.find((item) => item.x === positionX && item.y === positionY);
    if (existRes) return;
    e.target.appendChild(piece);
    pieceCoordinateArr.push({
      x: positionX,
      y: positionY,
      player: piece.getAttribute('player'),
    });
    step++;
    if (checkGame()) {
      this.onclick = null;
      return;
    }
  };
}
bindEvent();

/**
 * 判断是否结束
 */
function checkGame() {
  for (let i = 0; i < pieceCoordinateArr.length; i++) {
    let piece1 = pieceCoordinateArr[i];
    let piece2, piece3, piece4, piece5;

    //1. y轴上连续五个
    piece2 = pieceCoordinateArr.find(
      (item) => item.x === piece1.x + 1 && item.y === piece1.y && item.player === piece1.player
    );
    piece3 = pieceCoordinateArr.find(
      (item) => item.x === piece1.x + 2 && item.y === piece1.y && item.player === piece1.player
    );
    piece4 = pieceCoordinateArr.find(
      (item) => item.x === piece1.x + 3 && item.y === piece1.y && item.player === piece1.player
    );
    piece5 = pieceCoordinateArr.find(
      (item) => item.x === piece1.x + 4 && item.y === piece1.y && item.player === piece1.player
    );
    if (piece1 && piece2 && piece3 && piece4 && piece5) {
      end(piece1, piece2, piece3, piece4, piece5);
      return true;
    }

    //2. x轴上连续五个
    piece2 = pieceCoordinateArr.find(
      (item) => item.y === piece1.y + 1 && item.x === piece1.x && item.player === piece1.player
    );
    piece3 = pieceCoordinateArr.find(
      (item) => item.y === piece1.y + 2 && item.x === piece1.x && item.player === piece1.player
    );
    piece4 = pieceCoordinateArr.find(
      (item) => item.y === piece1.y + 3 && item.x === piece1.x && item.player === piece1.player
    );
    piece5 = pieceCoordinateArr.find(
      (item) => item.y === piece1.y + 4 && item.x === piece1.x && item.player === piece1.player
    );
    if (piece1 && piece2 && piece3 && piece4 && piece5) {
      end(piece1, piece2, piece3, piece4, piece5);
      return true;
    }

    // 3. 正斜着五个
    piece2 = pieceCoordinateArr.find(
      (item) => item.x === piece1.x + 1 && item.y === piece1.y + 1 && item.player === piece1.player
    );
    piece3 = pieceCoordinateArr.find(
      (item) => item.x === piece1.x + 2 && item.y === piece1.y + 2 && item.player === piece1.player
    );
    piece4 = pieceCoordinateArr.find(
      (item) => item.x === piece1.x + 3 && item.y === piece1.y + 3 && item.player === piece1.player
    );
    piece5 = pieceCoordinateArr.find(
      (item) => item.x === piece1.x + 4 && item.y === piece1.y + 4 && item.player === piece1.player
    );
    if (piece1 && piece2 && piece3 && piece4 && piece5) {
      end(piece1, piece2, piece3, piece4, piece5);
      return true;
    }

    // 4. 反斜着五个
    piece2 = pieceCoordinateArr.find(
      (item) => item.x === piece1.x + 1 && item.y === piece1.y - 1 && item.player === piece1.player
    );
    piece3 = pieceCoordinateArr.find(
      (item) => item.x === piece1.x + 2 && item.y === piece1.y - 2 && item.player === piece1.player
    );
    piece4 = pieceCoordinateArr.find(
      (item) => item.x === piece1.x + 3 && item.y === piece1.y - 3 && item.player === piece1.player
    );
    piece5 = pieceCoordinateArr.find(
      (item) => item.x === piece1.x + 4 && item.y === piece1.y - 4 && item.player === piece1.player
    );
    if (piece1 && piece2 && piece3 && piece4 && piece5) {
      end(piece1, piece2, piece3, piece4, piece5);
      return true;
    }
  }
}

function end(piece1, piece2, piece3, piece4, piece5) {
  for (let i = 0; i < pieceCoordinateArr.length; i++) {
    $(`.piece[x='${pieceCoordinateArr[i].x}'][y='${pieceCoordinateArr[i].y}']`).innerText = i;
  }

  for (let i = 0; i < arguments.length; i++) {
    $(`.piece[x='${arguments[i].x}'][y='${arguments[i].y}']`).classList.add('win');
  }
}
