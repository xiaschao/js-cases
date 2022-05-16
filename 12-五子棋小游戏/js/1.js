let arr = [
  { x: 5, y: 3 },
  { x: 1, y: 2 },
  { x: 2, y: 4 },
  { x: 4, y: 3 },
  { x: 5, y: 3 },
  { x: 5, y: 3 },
];

let res = arr.find((item) => item.x === 5 && item.y === 3);

// let res = arr.find(function (item) {
//   return item.x === 5 && item.y === 3;
// });
console.log(res);
