let input = {
	
	keyDown: [],
	
	keys: {
		'D' : 68,
		'A' : 65,
		'1' : 49,
		'ESC' : 27,
		'SPACE': 32
	},

	init: () => {
		window.onkeydown = e => {
			input.setKey(e.keyCode);
		};
		window.onkeyup = e => {
			input.clearKey(e.keyCode);
			
			player.status.type = 'idle';
			player.status.loaded = false;
		}
	},

	setKey: keyCode => {
		input.keyDown[keyCode] = true;
	},

	clearKey: keyCode => {
		input.keyDown[keyCode] = false
	},
	
	isDown: keyName => {
		return input.keyDown[input.keys[keyName]] == true;
	}

}
