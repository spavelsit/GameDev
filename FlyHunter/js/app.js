let resize = function () {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
},
	canvas = document.createElement('canvas'),
	$ = canvas.getContext("2d");

resize();
window.addEventListener('resize', resize);
document.body.appendChild(canvas);

let keys = {
	'D': 68,
	'A': 65,
	'W': 87,
	'S': 83,
	'SPACE': 32
},
	keyDown = [],
	setKey = keyCode => {
		keyDown[keyCode] = true;
	},
	clearKey = keyCode => {
		keyDown[keyCode] = false;
	},
	isDown = keyName => {
		return keyDown[keys[keyName]] == true;
	}

window.onkeydown = e => {
	setKey(e.keyCode);
}
window.onkeyup = e => {
	clearKey(e.keyCode);
}

let _checkGame = () => {
	console.log('error');
}

let _start = (game) => {
	if (typeof game == 'function') {
		_checkGame = game
	}
	_checkGame();
	window.requestAnimationFrame(_start);
}

let random = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


let fillAll = (color) => {
	$.fillStyle = color;
	$.fillRect(0, 0, width, height);
}

let clearAll = () => {
	$.clearRect(0, 0, width, height);
}

let _drawImage = function (img, x, y, w, h) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}

_drawImage.prototype.draw = function () {
	$.drawImage(this.img.dom, 0, 0, this.img.width, this.img.height, this.x, this.y, this.w, this.h)
}

let loadImage = (path, width, height) => {
	let image = document.createElement('img')

	let result = {
		dom: image,
		width: width,
		height: height,
		loaded: false
	}

	image.onload = function () {
		result.loaded = true;
	}

	image.src = path;

	return result;
}


let _drawRect = function (x, y, w, h, speed, color) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.speed = speed;
	this.color = color;
}
_drawRect.prototype.draw = function () {
	$.fillStyle = this.color;
	$.fillRect(this.x, this.y, this.w, this.h);
}

let bg = {
	nodes: [],

	add: function (x, w, h, speed) {
		this.nodes.push(new _drawRect(x, -10, w, h, speed, 'white'));
	},

	draw: function (count) {
		if (this.nodes.length < count) {
			this.add(random(0, width), random(1, 3), random(1, 3), random(1, 3));
		}

		this.nodes.forEach(el => {
			el.draw();


			el.y += el.speed
		});

		for (el in this.nodes) {
			if (this.nodes[el].y > height) {
				this.nodes.splice(el, 1)
			}
		}
	}

}

let player = {

	nodes: [],
	bullet: [],

	lastFire: Date.now(),

	speed: 5,
	draw: function () {
		if (this.nodes.length < 1) {
			this.nodes.push(new _drawImage(starship, (width / 2) - 50, height - 110, 100, 100));
		}
		this.nodes.forEach(el => {
			el.draw();
		})
	},
	move: function () {
		if (isDown('D')) this.nodes[0].x += this.speed;
		if (isDown('A')) this.nodes[0].x -= this.speed;
		if (isDown('W')) this.nodes[0].y -= this.speed;
		if (isDown('S')) this.nodes[0].y += this.speed;
	},

	bullets: function () {
		if (isDown('SPACE')) {
			if (Date.now() - this.lastFire > 300) {
				this.bullet.push(new _drawImage(fire, this.nodes[0].x, this.nodes[0].y, 100, 100));
				this.lastFire = Date.now();
			}

		}
		this.bullet.forEach(el => {
			el.draw();

			el.y -= this.speed + 1;

			if (el.y < -50) {
				this.bullet.splice(el, 1);
			}
		})
		
	}

}



let starship = loadImage('img/starship.png', 1400, 1448),
	fire = loadImage('img/fire.png', 82, 103);

//Game
function game() {

	clearAll();

	fillAll('rgb(0,0,0)');

	bg.draw(500);

	player.bullets();
	player.draw();
	player.move();


};
_start(game);






