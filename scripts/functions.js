var tela = document.querySelector('canvas');
var iniciaBtn = document.getElementById('iniciaBtn');
var pincel = tela.getContext('2d');

var telaX;
var telaY;
var raio;
var x;
var y;
var pontos;
var velocidade;
var xAleatorio;
var yAleatorio;
var nome;
var duploClick;
var mPontos = 0;
var interval;

function zeraVariaveis(){
	telaY = 500;
	raio = 10;
	pontos = 0;
	velocidade = 2000;
	xAleatorio = 1;
	yAleatorio = 1;
	duploClick = true;
	nome = prompt("Digite seu nome: ");
}

function calculaTamanhoMonitor(){
    telaX = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    testeTelaY = (window.innerHeight > 0) ? window.innerHeight : screen.height;

    telaY = testeTelaY - (100 * 2);

    var canvas = document.getElementById('canvas');
    canvas.width = telaX;
    canvas.height = telaY;
}

function paraInterval(intervalVariavel) {
  	clearInterval(intervalVariavel);
}

pincel.fillStyle = 'lightgray';
pincel.fillRect(0, 0, telaX, telaY);

function sorteaNumero(maximo){
	return Math.floor(Math.random() * maximo);
}

function limpaTela(){
	pincel.clearRect(0, 0, telaX, telaY);
	pincel.fillStyle = 'lightgray';
	pincel.fillRect(0, 0, telaX, telaY);
}

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

function movimentoAlvo(){
	limpaTela();
	duploClick = true;
	xAleatorio = sorteaNumero(telaX);
	yAleatorio = sorteaNumero(telaY);
	desenhaAlvo(xAleatorio, yAleatorio);
}

function verificaDuploClick(){
	if(duploClick === true){
		pontos = pontos + 100;
		velocidade = velocidade - 100;

		paraInterval(interval);

		interval = setInterval(movimentoAlvo, velocidade);

		duploClick = false;
	}
}

function verificaPosicao(xClicado, yClicado){
	if(xClicado > xAleatorio - raio && xClicado < xAleatorio + raio){
		if(yClicado > yAleatorio - raio && yClicado < yAleatorio + raio){
			return true;
		}
	}

	return false;
}

function cliquei(event){
	var xClicado = event.pageX - tela.offsetLeft;
	var yClicado = event.pageY - tela.offsetTop;

	if(verificaPosicao(xClicado, yClicado) === true){
		verificaDuploClick();			
	}

	if(pontos >= mPontos){
		mPontos = pontos;
		document.getElementById('mPontos').value = nome + " - " + pontos; 
	}

	document.getElementById('pontos').value = pontos;
	document.getElementById('velocidade').value = velocidade;
}

function inicia(){
	zeraVariaveis();
	calculaTamanhoMonitor();
	paraInterval(interval);
	movimentoAlvo();
}

iniciaBtn.onclick = inicia;

tela.onclick = cliquei;