game.newLoop('gameOver', function () {
	document.getElementById("gameOver").style.display = 'block';

	user.count = 0;

	user.player.x = wall.size / 2;
	user.player.y = wall.size / 2;
	eat.size = user.player.radius = 10;
	

	document.getElementById("reset").addEventListener('click', () => {
		document.getElementById("gameOver").style.display = 'none';
		game.setLoop('game');
	})
});


game.newLoop('game', function () {

	game.clear();

	wall.init();
	user.init(); //ОТРИСОВКА ИГРОКА НА ПОЛЕ

	eat.init(500);

}) // закончился ировой цикл myGame


game.setLoop('game');
game.start();