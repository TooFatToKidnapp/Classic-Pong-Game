import  Ball  from "./ball.js";
import Paddle from './paddle.js'

const ball = new Ball(document.getElementById('ball'))
const playerPaddle = new Paddle(document.getElementById('player-paddle'))
const computerrPaddle = new Paddle(document.getElementById('computer-paddle'))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
let lastTime

function update(time) {
	if(lastTime != null) {
		const delta = time - lastTime
		ball.update(delta, [playerPaddle.rect(), computerrPaddle.rect()] );
		computerrPaddle.update(delta, ball.y);
		const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
		document.documentElement.style.setProperty('--hue', hue + delta * 0.01)
		if(isLose()) {
			handelLose();
		}
	}
	lastTime = time
	window.requestAnimationFrame(update)
}

document.addEventListener('mousemove', e => {
	playerPaddle.position = (e.y / window.innerHeight) * 100;
})

function handelLose() {
	const rect = ball.rect();
	if (rect.right >= window.innerWidth) {
		playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
	}
	else {
		computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
	}
	computerrPaddle.reset()
	ball.reset()
}

function isLose() {
	const rect = ball.rect();
	return rect.right >= window.innerWidth || rect.left <= 0
}

window.requestAnimationFrame(update)
