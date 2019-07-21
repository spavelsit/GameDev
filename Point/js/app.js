const 
  canvas = document.createElement('canvas'),
  $      = canvas.getContext('2d');
  
width   = canvas.width  = window.innerWidth;
height  = canvas.height = window.innerHeight;

document.body.appendChild(canvas);

const options = {
  color: 'hsl(hue, 100%, 40%)',
  radius: 10
}

let 
  tick = 0,
  currentHue = 0,
  painting = false;

canvas.onmousedown = () => {
  painting = true;
  console.log('Down');
}

canvas.onmouseup = () => {
  painting = false;
  console.log('Up');
}

canvas.addEventListener('mousemove', event => {
  const
    posX = event.pageX,
    posY = event.pageY;

  if (painting) {
    ++tick;
    if (!(tick % 10)) {
      if (currentHue !== 356) {
        currentHue++
      } else {
        currentHue = 0;
      }

      console.log('change');
    }

    const currentColor = options.color.replace('hue', currentHue * 2);

    $.fillStyle = currentColor;
    $.beginPath();
    $.arc(posX, posY, options.radius, 0, Math.PI * 2);
    $.fill();
  }
});

