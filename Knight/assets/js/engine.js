/* Создание анимации в 60FPS */
const renderer = (() => {
	return window.requestAnimationFrame ||  //Стандартный вызов функции при обновление окна(window....)
		window.webkitRequestAnimationFrame ||  //Вызов функции для браузеров семейтва Chromium
		function (callback) { 	// Вслучае когда не подходит не один из вариантов вызывает функцию обновления по таймеру
			window.setTimeout(callback, 1000 / 60);
		}
})();

let typeEngine = () => { //Создаем переменную которая будет содержать самому функцию игры
	console.log('Ошибка инициализации!');//Вслучае если переменная не перезаписанна выводим сообщения об ошибки
}

const setInit = game => { //В случае если переменная game является функцией, то перезаписываем переменую typeEngine;
	if (typeof game === 'function') {
		typeEngine = game;
	}
}

const startInit = game => {
	setInit(game);

	typeEngine();
	renderer(startInit);
}
const resize = () => {
	width = cnv.width = window.innerWidth;
	height = cnv.height = window.innerHeight;
}

const cnv = document.createElement('canvas'),
	$ = cnv.getContext("2d");

resize();
window.addEventListener('resize', resize);

document.body.appendChild(cnv);

const random = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const auth = () => {
	if (player.auth === false) {
		document.getElementById("hidden").style.display = 'block';

		document.getElementById("contentID").innerHTML = '<ul><li>Enter your name and press the start button</li><li>Go ahead by overcoming the obstacles</li><li>Destroy the monsters in your path</li><li>Use the skills to fight monsters</li><li>Each skill uses MP, but MP regenerates by 5MP/sec</li></ul><input type="text" id="username" placeholder="Enter your name, Hero!"><input type="submit" id="check" disabled value="Next!">';
		player.auth = true;
	}

	if (document.getElementById('username').value != '') {

		document.getElementById('check').disabled = false;
		document.getElementById('check').addEventListener('click', () => {

			document.getElementById("hidden").style.display = 'none';
			player.username = document.getElementById('username').value;
			setInit(init);

		});

	} else {
		document.getElementById('check').disabled = true;
	}
}

const pause = () => {
	if (player.status.pause == false) {
		document.getElementById("hidden").style.display = 'block';


		document.getElementById('contentID').style.textAlign = 'center'
		document.getElementById('contentID').innerHTML = '<div class="fzPause"><strong>PAUSE</strong><p>Нажмите ESC чтобы продолжить игру или кнопку ниже</p><br><button id="contineGame">Продолжить</button></div>';

		player.status.pause = true;
	}
	clearAll();

	player.draw();

	document.addEventListener('keyup', (e) => {
		if (e.keyCode == 27) {
			setInit(init);
			document.getElementById("hidden").style.display = 'none';

			player.status.pause = false;
		}
	})
	document.getElementById("contineGame").addEventListener('click', () => {
		setInit(init);
		document.getElementById("hidden").style.display = 'none';

		player.status.pause = false;
	})



}
const gameOver = () => {
	if (player.status.gameOver == false) {
		document.getElementById("hidden").style.display = 'block';


		document.getElementById('contentID').style.textAlign = 'center'
		document.getElementById('contentID').innerHTML = '<div class="fzPause"><strong>GameOver</strong><p>Вы проиграли!<br><b>Пользователь: </b>' + player.username + '<br><b>Время в игре: </b>' + player.time.result + '<br><b>Убито монстров: </b>' + player.score + '</p><br><button id="reset">Начать заного</button></div>';

		player.status.gameOver = true;
	}
	clearAll();
	document.getElementById("reset").addEventListener('click', () => {

		player.nodes = [];

		player.hp = 100;
		player.mp = 100;

		player.score = 0;

		player.status.type = 'idle';
		player.status.side = 'Right';
		player.status.loaded = false;

		player.time.min = 0;
		player.time.sec = 0;
		player.time.ms = 0;

		player.position = 0


		enemy.nodes = [];

		enemy.hp = 100;

		enemy.status.loaded = false;
		enemy.status.type = 'run';
		enemy.status.side = 'Left';

		document.getElementById("hidden").style.display = 'none';

		player.status.gameOver = false;

		setInit(init);
	})



}


const winGame = () => {
	if (player.status.gameOver == false) {
		document.getElementById("hidden").style.display = 'block';


		document.getElementById('contentID').style.textAlign = 'center'
		document.getElementById('contentID').innerHTML = '<div class="fzPause"><strong>You Win</strong><p>Вы выйграли!<br><b>Пользователь: </b>' + player.username + '<br><b>Время в игре: </b>' + player.time.result + '<br><b>Убито монстров: </b>' + player.score + '</p><br><button id="reset">Начать заного</button></div>';

		player.status.gameOver = true;
	}
	clearAll();
	document.getElementById("reset").addEventListener('click', () => {

		player.nodes = [];

		player.hp = 100;
		player.mp = 100;

		player.status.type = 'idle';
		player.status.side = 'Right';
		player.status.loaded = false;
		player.status.score = 0;

		player.time.min = 0;
		player.time.sec = 0;
		player.time.ms = 0;

		player.position = 0


		enemy.nodes = [];

		enemy.hp = 100;

		enemy.status.loaded = false;
		enemy.status.type = 'run';
		enemy.status.side = 'Left';

		document.getElementById("hidden").style.display = 'none';

		player.status.gameOver = false;

		setInit(init);
	})
}
