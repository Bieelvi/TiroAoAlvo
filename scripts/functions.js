var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');

pincel.fillStyle = 'white';
pincel.fillRect(0, 0, 800, 500);

var raio = 10;
var x;
var y;
var pontos = 0;

function desenhaCirculo(x, y, raio, cor){
	pincel.fillStyle = cor;
	pincel.beginPath();
	pincel.arc(x, y, raio, 0, 2*Math.PI);
	pincel.fill();
}

function desenhaAlvo(x, y){
	desenhaCirculo(x, y, raio + 20, 'red');
	desenhaCirculo(x, y, raio + 10, 'white');
	desenhaCirculo(x, y, raio, 'red');
}

function sorteaNumero(maximo){
	return Math.floor(Math.random() * maximo);
}

function limpaTela(){
	pincel.clearRect(0, 0, 800, 500);
}

function movimentoAlvo(){
	limpaTela();
	xAleatorio = sorteaNumero(800);
	yAleatorio = sorteaNumero(500);
	desenhaAlvo(xAleatorio, yAleatorio);
}

setInterval(movimentoAlvo, 1000);

function cliquei(event){
	var xClicado = event.pageX - tela.offsetLeft;
	var yClicado = event.pageY - tela.offsetTop;

	if(xClicado > xAleatorio - raio && xClicado < xAleatorio + raio){
		if(yClicado > yAleatorio - raio && yClicado < yAleatorio + raio){
			alert("OPA");
		}
	}

	console.log("X: " + xClicado + "Y: " + yClicado);
}

tela.onclick = cliquei;