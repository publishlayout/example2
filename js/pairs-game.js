window.addEventListener('load', init);

let width = 4;
let length = 4;
const surface = {};

function init() {
  document.getElementById('width').addEventListener('input', parameters);
  document.getElementById('length').addEventListener('input', parameters);
  
  const _surface = () => document.getElementsByTagName('main')[0].firstElementChild;
  surface.element = _surface;
  parameters();
  
  const form = document.getElementsByClassName('parameters')[0];
  const button = form.getElementsByClassName('button')[0];
  button.addEventListener('click', createSurface);
  
  document.getElementsByTagName('footer')[0].firstElementChild.addEventListener('click', (e) => {
    addClass(e.target, 'hidden');
    createSurface();
  });
  
  document.getElementsByClassName('toggle-form')[0].addEventListener('click', (e) => {
	  toggleClass(document.getElementsByClassName('parameters')[0], 'disable');
	  if(haveClass(document.getElementsByClassName('parameters')[0], 'disable')) {
	    e.target.textContent = 'Открыть настройки';
	  } else
	    e.target.textContent = 'Закрыть настройки';
  });
}

function parameters() {
  const errorEl = document.getElementsByClassName('parameters')[0].getElementsByClassName('error')[0];
  const errorMaxEl = document.getElementsByClassName('parameters')[0].getElementsByClassName('error')[1];
  
  let _widthValue = parseInt(document.getElementById('width').value, 10)
  let _lengthValue = parseInt(document.getElementById('length').value, 10);
  
  width = _widthValue * _lengthValue % 2 == 0 && _widthValue > 0 ? _widthValue : width;
  
  length = _lengthValue * _widthValue % 2 == 0 && _lengthValue > 0 ? _lengthValue : length;
  
  if(_lengthValue == 0 || _widthValue * _lengthValue % 2 > 0 || _widthValue == 0) {
    removeClass(errorEl, 'hide');
  } else 
	addClass(errorEl, 'hide');
  if(_widthValue > 10 || _lengthValue > 10) 
	  removeClass(errorMaxEl, 'hide');
  else 
	  addClass(errorMaxEl, 'hide');
}

function createSurface() {
  
  if(document.getElementsByClassName('parameters')[0].getElementsByClassName('hide').length != 2) {
    return;
  }
  
  surface.element().innerHTML = '';
  let cellsCount = width * length;
  
  let arr = new Array(width * length);
  arr[0] = 0;
  let arrTmp = new Array(width * length);
  
  for(let i = 1; i <= cellsCount; i++) {
	if(!arr[i] > 0)
      arr[i] = width * length / 2 < i ? i - width * length / 2 : i;
    
    let randFn = () => {
      let rand = Math.floor(Math.random() * (width * length - 1)) + 1;
      if(arrTmp.some((i, key) => key==rand))
    	randFn();
      arrTmp.push(rand);
      
      let tmp = arr[rand];
  	  if(!arr[rand] > 0) {
  	    tmp = width * length / 2 < rand ? rand - width * length / 2 : rand;
  	  }
      
      arr[rand] = arr[i];
      arr[i] = tmp;
    };
    randFn();
  }
  
  for(let i = 0; i < cellsCount; ++i) {
  	let el = document.createElement('div');
  	el.innerHTML = '<span>' + arr[i+1] + '</span>';
  	document.getElementsByTagName('main')[0].firstElementChild.appendChild(el);
  	
  	el.addEventListener('click', (e) => {
  	  e.stopImmediatePropagation();
  	  el = e.target.firstElementChild ? e.target.firstElementChild : e.target;
  	  
  	  let elAll = Array.from(document.getElementsByTagName('main')[0].firstElementChild.getElementsByClassName('open'));
  	  if(elAll.length == 1) {
  		
        if(elAll[0].textContent==el.textContent) {
          toggleClass(elAll[0], 'opened');
          toggleClass(elAll[0], 'open');
          toggleClass(el, 'opened');
        } else {
          toggleClass(el, 'open');
        }
  	  } else if(elAll.length == 2) {
  		elAll.forEach(function(item) {
  		  toggleClass(item, 'open');
  		});
  		toggleClass(el, 'open');
  	  } else
  		toggleClass(el, 'open');
  	  
  	  if(document.getElementsByTagName('main')[0].firstElementChild.getElementsByClassName('opened').length==width*length) {
  		removeClass(document.getElementsByTagName('footer')[0].firstElementChild, 'hidden');
  	  }
  	});
  }
  surface.element().style.width = width * 115 + 'px';
}

function toggleClass(el, className) {
  let classes = el.className.split(" ");
  let i = classes.indexOf(className);

  if (i >= 0)
	classes.splice(i, 1);
  else
	classes.push(className);
  el.className = classes.join(" ");
}

function removeClass(el, className) {
  let classes = el.className.split(" ");
  let i = classes.indexOf(className);

  if (i >= 0)
	classes.splice(i, 1);
  el.className = classes.join(" ");
}

function addClass(el, className) {
  let classes = el.className.split(" ");
  let i = classes.indexOf(className);

  if (i < 0)
	classes.push(className);
  el.className = classes.join(" ");
}

function haveClass(el, className) {
  if((" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1) {
	return true;
  } else {
	return false;
  }
}