const clearAll = () => {
	$.clearRect(0, 0, width, height);
	
}

const loadImage = (path, count) => {
	const image = document.createElement('img');

	result = {
		dom: image,
		count: count,
		num: 1,
		loaded: false
	}

	image.onload = () => {
		result.loaded = true;
	}

	image.src = path;

	return result;
}

const Sprite = function(img, x, y, w, h) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}

Sprite.prototype.draw = function() {
	if(this.img.count > this.img.num) {this.img.num += 1} else {this.img.num = 1}
	$.drawImage(this.img.dom, (this.img.dom.naturalWidth / this.img.count) * (this.img.num - 1), 0, (this.img.dom.naturalWidth / this.img.count), this.img.dom.naturalHeight, this.x, this.y, this.w, this.h);
}

