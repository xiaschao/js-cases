var proDom = document.getElementById('province');
var cityDom = document.getElementById('city');
var univerDom = document.getElementById('university');

for (var k in province) {
  proDom.innerHTML += `<option value="${k}">${province[k]}</option>`;
}

proDom.addEventListener('change', function () {
  cityDom.innerHTML = '';
  univerDom.innerHTML = '';
  if (this.value === '00') return;
  var cityObj = {};
  cityObj = city[this.value];
  for (let k in cityObj) {
    cityDom.innerHTML += `<option value="${k}">${cityObj[k]}</option>`;
  }
  // console.log(cityDom.firstChild);
  var value = cityDom.firstChild.value;
  var universityArr = allschool[value];
  universityArr.forEach((element) => {
    univerDom.innerHTML += `<option>${element}</option>`;
  });
});

cityDom.addEventListener('change', function () {
  univerDom.innerHTML = '';
  var universityArr = allschool[this.value];
  universityArr.forEach((element) => {
    univerDom.innerHTML += `<option>${element}</option>`;
  });
});
