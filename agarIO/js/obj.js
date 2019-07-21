const pjs = new PointJS(1100, 620, { background: 'transparent' })

pjs.system.initFullPage();

let game = pjs.game;
let mouse = pjs.mouseControl;
mouse.initControl();
let r = pjs.math.random;

const wall = {

	size: 1000,
	border: 10,
	color: 'blue',

	init: () => {
		wall.left();
		wall.right();
		wall.top();
		wall.bottom();
	},

	left: () => {
		game.newRectObject({
			x: 0,
			y: wall.border,
			w: wall.border,
			h: wall.size,
			fillColor: wall.color,

		}).draw()
	},
	right: () => {
		game.newRectObject({
			x: wall.size - wall.border,
			y: wall.border,
			w: wall.border,
			h: wall.size,
			fillColor: wall.color,

		}).draw()
	},
	top: () => {
		game.newRectObject({
			x: 0,
			y: 0,
			w: wall.size,
			h: wall.border,
			fillColor: wall.color,

		}).draw()
	},
	bottom: () => {
		game.newRectObject({
			x: 0,
			y: wall.size,
			w: wall.size,
			h: wall.border,
			fillColor: wall.color,

		}).draw()
	}
}

const user = {
	count: 0,

	init: () => {
		user.player.draw();

		user.move();

		document.getElementById("score").innerHTML = user.count;
		document.body.style.backgroundPositionX = (user.player.x / 15) + '%';
		document.body.style.backgroundPositionY = (user.player.y / 15) + '%';
	},
	move: () => {
		if (user.player.getPositionC().x > wall.size - (user.player.radius + wall.border) ||
			user.player.getPositionC().y > wall.size - (user.player.radius) ||
			user.player.getPositionC().x  < 0 + (user.player.radius + wall.border)||
			user.player.getPositionC().y < 0 + (user.player.radius + wall.border)) {
			game.setLoop('gameOver');
		} else {
			user.player.moveTimeC(mouse.getPosition(), user.player.radius * 4);
		}



		pjs.camera.setPositionC(user.player.getPosition(1));
	},
	player: game.newCircleObject({
		x: wall.size / 2, y: wall.size / 2,
		radius: 10,
		fillColor: pjs.colors.randomColor(0, 255),
		angle: 0, alpha: 1,
		visible: true
	})
}

const eat = {
	nodes: [],
	size: user.player.radius,
	init: (count) => {
		eat.draw(count);

		eat.collision();

		eat.skill();

		eat.nodes.forEach(el => {
			if (el.isInCamera()) {
				el.draw();

				if (user.player.getDistanceC(el.getPositionC()) < user.player.radius + el.radius + 20) {
					el.moveTimeC(user.player.getPositionC(), 40);
				}
			}
		})
	},
	draw: (count) => {
		if (eat.nodes.length < count) {
			eat.nodes.push(
				game.newCircleObject({
					x: r(wall.border + 10, wall.size - (wall.border + 10)),
					y: r(wall.border + 10, wall.size - (wall.border + 10)),
					radius: r(3, 6),
					fillColor: pjs.colors.randomColor(0, 255)
				})
			);
		}
	},
	collision: () => {
		for (let i in eat.nodes) {
			if (user.player.getDistanceC(eat.nodes[i].getPosition(1)) < user.player.radius + eat.nodes[i].radius) {
				eat.nodes.splice(i, 1);
				eat.size += 1;
				user.player.setRadiusC(eat.size);
				user.count++;
			}
		}
	},
	skill: () => {
		if(mouse.isDown("LEFT")) {
			console.log(1);
		}
	}
}
