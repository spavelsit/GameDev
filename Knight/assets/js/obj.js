let player = {
	nodes: [],

	username: 'UserName',
	auth: false,
	hp: 100,
	mp: 100,

	img: {
		idleRight: loadImage('assets/img/player/idleRight.png', 18),
		runRight: loadImage('assets/img/player/runRight.png', 17),
		idleLeft: loadImage('assets/img/player/idleLeft.png', 18),
		runLeft: loadImage('assets/img/player/runLeft.png', 17),
		skillOneRight: loadImage('assets/img/player/attack1Right.png', 21),
		skillOneLeft: loadImage('assets/img/player/attack1Left.png', 21)
	},

	status: {
		type: 'idle',
		side: 'Right',
		pause: false,
		gameOver: false,
		loaded: false,
		kill: false,
		fire: true
	},

	score: 0,

	speed: 3,

	position: 0,

	time: {
		result: 0,
		min: 0,
		sec: 0,
		ms: 0
	},

	liveTime: () => {
		let min, sec;

		if (player.time.sec < 10) { sec = '0' + player.time.sec } else { sec = player.time.sec };
		if (player.time.min < 10) { min = '0' + player.time.min } else { min = player.time.min };

		if (player.time.ms < 60) { player.time.ms += 1; };

		if (player.time.ms == 60) {
			player.time.sec += 1;
			player.time.ms = 0;

			enemy.status.break = true;
			player.status.fire = true;

			if (enemy.status.type == 'skill') {
				player.hp -= 20
			}

			if (player.hp < 100) {
				player.hp += 5;
			} else {
				player.hp = 100
			}
			if (player.mp < 100) {
				player.mp += 5;
			} else {
				player.mp = 100;
			}
		}

		if (player.time.sec == 60) {
			player.time.min += 1;
			player.time.sec = 0;
		}
		if(player.hp <= 0) {
			setInit(gameOver);
		}
		player.time.result = min + ':' + sec;
		document.getElementById("time").innerHTML = min + ':' + sec;

		document.getElementById("score").innerHTML = player.score;

		document.getElementById("login").innerHTML = player.username;

		document.getElementById("hp").style.width = player.hp + '%';
		document.getElementById("hpStat").innerHTML = player.hp;

		document.getElementById("mp").style.width = player.mp + '%';
		document.getElementById("mpStat").innerHTML = player.mp;
	},
	draw: () => {
		let x;
		if (player.nodes[0] == undefined) { x = 10 } else { x = player.nodes[0].x; }

		if (player.status.loaded === false) {

			player.nodes = [];

			if (player.status.type == 'idle') {
				if (player.status.side == 'Right') {
					player.nodes.push(new Sprite(player.img.idleRight, x, height - 300, 200, 200));
				}
				if (player.status.side == 'Left') {
					player.nodes.push(new Sprite(player.img.idleLeft, x, height - 300, 200, 200));
				}


				player.status.loaded = true;
			}

			if (player.status.type == 'run') {
				if (player.status.side == 'Right') {
					player.nodes.push(new Sprite(player.img.runRight, x, height - 300, 250, 210));
				}
				if (player.status.side == 'Left') {
					player.nodes.push(new Sprite(player.img.runLeft, x, height - 300, 250, 210));
				}

				player.status.loaded = true;
			}

			if (player.status.type == 'skillOne') {
				if (player.status.side == 'Right') {
					player.nodes.push(new Sprite(player.img.skillOneRight, x, height - 300, 380, 200));
				}
				if (player.status.side == 'Left') {
					player.nodes.push(new Sprite(player.img.skillOneLeft, x, height - 300, 380, 200));
				}

				player.status.loaded = true;
			}

		}

		player.nodes.forEach(el => {
			el.draw();
		});


		if(x > width) {
			setInit(winGame);
		}
	},
	move: () => {
		if (input.isDown('D')) {
			player.position += 1 / (player.speed + 9);
			player.nodes[0].x += player.speed;

			player.status.type = 'run';
			player.status.side = 'Right';

			if (player.status.loaded === true) player.status.loaded = false;

		}

		if (input.isDown('A')) {
			player.position -= 1 / (player.speed + 9);
			player.nodes[0].x -= player.speed

			player.status.type = 'run';
			player.status.side = 'Left';

			if (player.status.loaded === true) player.status.loaded = false;
		}
		document.getElementById('bg').style.backgroundPositionX = player.position + '%';
	},
	skill: () => {

		if (input.isDown('1')) {
			player.status.type = 'skillOne';
			if (player.status.fire == true) {
				if (player.mp > 5) {
					
					player.mp -= 10;
					if (enemy.status.break == true) {
						if (player.status.kill == true) {
							enemy.hp -= 20;
							enemy.status.break = false;

						}
					}

				}
				if (player.status.loaded === true) player.status.loaded = false;

				player.status.fire = false;
			}
		}
	},
	pause: () => {
		document.addEventListener('keyup', (e) => {
			if (e.keyCode == 27) {
				setInit(pause);
			}
		})
	}
}

let enemy = {
	nodes: [],
	hp: 100,

	img: {
		enemyGrinRight: loadImage('assets/img/enemy/grin/enemyGrinRight.png', 20),
		enemyGrinLeft: loadImage('assets/img/enemy/grin/enemyGrinLeft.png', 20),
		enemyGrinAttackRight: loadImage('assets/img/enemy/grin/enemyGrinAttackRight.png', 20),
		enemyGrinAttackLeft: loadImage('assets/img/enemy/grin/enemyGrinAttackLeft.png', 20),
	},

	status: {
		loaded: false,
		type: 'run',
		side: 'Left',
		break: true
	},

	init: () => {
		let x;
		if (enemy.nodes[0] == undefined) { x = width + 100 } else { x = enemy.nodes[0].x; }

		$.fillStyle = '#9f000a';
		$.fillRect(x + 60, height - 300, enemy.hp, 10);

		if (enemy.status.loaded === false) {

			enemy.nodes = [];

			if (enemy.status.type == 'run') {
				if (enemy.status.side == 'Right') {
					enemy.nodes.push(new Sprite(enemy.img.enemyGrinRight, x, height - 300, 200, 200));
				}
				if (enemy.status.side == 'Left') {
					enemy.nodes.push(new Sprite(enemy.img.enemyGrinLeft, x, height - 300, 200, 200));
				}


				enemy.status.loaded = true;
			}
			if (enemy.status.type == 'skill') {
				if (enemy.status.side == 'Right') {
					enemy.nodes.push(new Sprite(enemy.img.enemyGrinAttackRight, x, height - 300, 200, 200));
				}
				if (enemy.status.side == 'Left') {
					enemy.nodes.push(new Sprite(enemy.img.enemyGrinAttackLeft, x, height - 300, 200, 200));
				}


				enemy.status.loaded = true;
			}


		}

		enemy.nodes.forEach(el => {
			el.draw();
		});

		if (x + 150 < player.nodes[0].x) {

			enemy.nodes[0].x += player.speed / 2;

			enemy.status.type = 'run';
			enemy.status.side = 'Right';
			player.status.kill = false;

			if (enemy.status.loaded === true) enemy.status.loaded = false;

		} else {
			if (enemy.status.side == 'Right') {
				enemy.status.type = 'skill';
				player.status.kill = true;
				if (enemy.status.loaded === true) enemy.status.loaded = false;
			}
		}


		if (x - 80 > player.nodes[0].x) {

			enemy.nodes[0].x -= player.speed / 2;
			enemy.status.type = 'run';
			enemy.status.side = 'Left';
			player.status.kill = false

			if (enemy.status.loaded === true) enemy.status.loaded = false;

		} else {
			if (enemy.status.side == 'Left') {
				enemy.status.type = 'skill';
				player.status.kill = true
				if (enemy.status.loaded === true) enemy.status.loaded = false;
			}
		}

		if (enemy.hp <= 0) {
			enemy.hp = 100;
			enemy.nodes[0].x = width + 100;
			player.score += 1;
		}
	}


}