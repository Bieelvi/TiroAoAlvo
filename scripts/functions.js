var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');

var telaX = 900;
var telaY = 500;

pincel.fillStyle = 'lightgray';
pincel.fillRect(0, 0, telaX, telaY);

var raio = 10;
var x;
var y;
var pontos = 0;
var velocidade = 2000;
var interval;

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
	pincel.clearRect(0, 0, telaX, telaY);
	pincel.fillStyle = 'lightgray';
	pincel.fillRect(0, 0, telaX, telaY);
}

function movimentoAlvo(){
	limpaTela();
	xAleatorio = sorteaNumero(telaX);
	yAleatorio = sorteaNumero(telaY);
	desenhaAlvo(xAleatorio, yAleatorio);
}

function cliquei(event){
	var xClicado = event.pageX - tela.offsetLeft;
	var yClicado = event.pageY - tela.offsetTop;

	if(xClicado > xAleatorio - raio && xClicado < xAleatorio + raio){
		if(yClicado > yAleatorio - raio && yClicado < yAleatorio + raio){
			pontos = pontos + 100;
			alert("Acertou! Você tem: " + pontos);

			velocidade = velocidade - 100;

			clearInterval(interval);
			interval = setInterval(movimentoAlvo, velocidade);
		}
	}
}

function inicia(){
	interval = setInterval(movimentoAlvo, velocidade);
}

tela.onclick = cliquei;