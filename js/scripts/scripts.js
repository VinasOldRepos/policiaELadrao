var TAMANHOOBJETO = 50,
    TAMANHODINHEIRO = 20,
	TEMPOPADRAO = 20,
    PONTOSPORFASE = 40,
    VALORDINHEIRO = 5,
    TEMPOBONUS = 4;

var tecla,
	posRelX,
	posRelY,
	diferencaX,
	diferencaY,
	direcao,
    pontos,
    dinheiroVis,
    movimentacaoLadrao,
    movimentacaoPolicia,
    jogoOn,
    faseAtual,
    ultimaFase,
    tempo,
    teclaBump;

var arrPosPolicia = new Array(0, 0);
var arrPosLadrao = new Array(0, 0);
var arrPosDinheiro = new Array(600, 600);
    
// Loop principal do jogo
window.setInterval(function() {

    if (jogoOn == true) {
	    if (tempo >= 0) {
	    	if ((pontos != 0) && (pontos % PONTOSPORFASE == 0)) {
                faseTemp = pontos / PONTOSPORFASE;
                console.log(Array(faseAtual, faseTemp));
                if (faseAtual <= faseTemp) {                   
                    movimentacaoPolicia = movimentacaoPolicia + 1;
                    ultimaFase = faseAtual;
                    faseAtual = faseAtual + 1;
                    $("#fase").html(faseAtual);
                }
	    	}
	        $("#tempo").html(tempo);
	        tempo = tempo - 1;
		    $.apareceDinheiro();
                 
	    } else {
	        $.fimDeJogo();
	    }
    }
	
}, 1000);

$(document).keydown(function(e) {
    tecla = e.which;
});

$(document).keyup(function() {
    tecla = false;
    
});

$(document).ready(function() {
    
    $.gameLoop = function() {
        if (tecla == 37) {
            $.movimento("esquerda");
        // Cima
        } else if (tecla == 38) {
            $.movimento("cima");
        // Direita
        } else if (tecla == 39) {
            $.movimento("direita");
        // Baixo
        } else if (tecla == 40) {
            $.movimento("baixo");
        // Enter - RESET
        } else if ((tecla == 13) && (tecla != teclaBump)) {
            $.resetGame();
            teclaBump = tecla;      
        } else if (tecla != 13) {
            teclaBump = false;
        }

        setTimeout($.gameLoop, 20);
    };

    $.setupJogo = function() {
        tempo = TEMPOPADRAO;
        pontos = 0;
        dinheiroVis = false;
        movimentacaoLadrao = 10;
        movimentacaoPolicia = 6;
        jogoOn = false;
        faseAtual = 1;
        ultimaFase = 0;    

        arrPosLadrao[0] = 0;
        arrPosLadrao[1] = 0;
        arrPosPolicia[0] = 600 - TAMANHOOBJETO;
        arrPosPolicia[1] = 600 - TAMANHOOBJETO;
        
        ladrao.style.left = arrPosLadrao[0];
        ladrao.style.top = arrPosLadrao[1];
        policia.style.left = arrPosPolicia[0];
        policia.style.top = arrPosPolicia[1];
    }

    $.resetGame = function() {
        $.setupJogo();


        $("#ladrao").show();
        $("#policia").show();
        $("#dinheiro").show();
        $("#pontos").html("0");

        dinheiroVis = false;
        $.apareceDinheiro();
        jogoOn = true;
        $("#l_fundo").html("");

        $("#fase").html(faseAtual);
        $("#tempo").html(tempo);
    };

    // Função que checa se ladrão pegou o dinheiro
    $.pegouDinheiro = function() {
        // Se ladrão pegou dinheiro
        if ($.alcancou(arrPosLadrao, TAMANHOOBJETO, arrPosDinheiro, TAMANHODINHEIRO)) {
            pontos = pontos + VALORDINHEIRO;
            tempo = tempo + TEMPOBONUS;
            $("#pontos").html(pontos);
            dinheiroVis = false;
            $.apareceDinheiro();
        }
    };

    // Função que faz aparecer dinheiro
    $.apareceDinheiro = function() {
        if (dinheiroVis == false) {
            arrPosDinheiro[0] = Math.floor((Math.random() * 580));
            arrPosDinheiro[1] = Math.floor((Math.random() * 580));
            $("#dinheiro").css("left", arrPosDinheiro[0])
            $("#dinheiro").css("top", arrPosDinheiro[1])
            $("#dinheiro").show();
            dinheiroVis = true;
        }
    };

    // Função que checa se dois objetos se tocaram
    $.alcancou = function(cacador, tamanhoCacador, presa, tamanhoPresa) {
        if (
            ((cacador[0] >= (presa[0] - tamanhoCacador))
            && (cacador[0] < (presa[0] + tamanhoPresa)))
            && ((cacador[1] >= (presa[1] - tamanhoCacador))
            && (cacador[1] < (presa[1] + tamanhoPresa)))
        ){
            return true;
        }
        return false;
    };

    // Função que exibde mensagem de fim de jogo
    $.fimDeJogo = function(motivo) {
    	tempo = 0;
    	dinheiroVis = false;
    	jogoOn = false;
        if (motivo) {
            $("#l_fundo").html(motivo + "\n\nACABOU O JOGO: PRESSIONE ENTER PARA RECOMEÇAR");
        } else {
            $("#l_fundo").html("ACABOU O JOGO: PRESSIONE ENTER PARA RECOMEÇAR");
        }
        $("#ladrao").hide();
        $("#policia").hide();
        $("#dinheiro").hide();
    };

    /* ******************************* */

    $("#resetGame").on("click", function() {
        $.resetGame();
    });

    $("#touchUp").on("click", function() {
        tecla = 38;
    });
    $("#touchDown").on("click", function() {
       tecla = 40;
    });
    $("#touchLeft").on("click", function() {
        tecla = 37;
    });
    $("#touchRight").on("click", function() {
        tecla = 39;
    });

    $.gameLoop();
});