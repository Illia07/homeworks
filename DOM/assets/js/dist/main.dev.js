"use strict";

console.log(document.childNodes[1].childNodes[2]);
var div = document.createElement('div');
var h1 = document.createElement('h1');
h1.innerText = "hello im tag from js";
h1.setAttribute('style', "color:red;");
h1.style.fontSize = '60px';
console.log(h1.style);

function setStyle(el, styles) {
  for (var prop in styles) {
    el.style[prop] = styles[prop];
  }
}

setStyle(h1, {
  fontSize: '50px',
  color: 'red',
  position: 'fixed',
  left: '200px',
  top: '100px'
});
setStyle(div, {
  padding: '50px',
  backgroundColor: 'gray',
  width: '400px',
  height: '200px'
});

h1.onclick = function () {
  chTitle('other text');
};

div.appendChild(h1);
document.body.appendChild(div);
console.log(document.getElementsByClassName('foo'));

function chTitle(t) {
  h1.innerText = t;
}

var live = document.getElementsByClassName('live');
var dead = document.querySelectorAll('.dead');
console.log(live);
console.log(dead);
var div_live = document.createElement('div');
div_live.classList.add('live');
document.body.appendChild(div_live);
var div_dead = document.createElement('div');
div_dead.classList.add('dead');
document.body.appendChild(div_dead);
dead = document.querySelectorAll('.dead');
console.log(dead);