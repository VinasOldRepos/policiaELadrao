$('document').ready(function() {

        // Funcão que aciona movimentos do jogo
        $.movimento = function(direcaoComando) {
            if (direcaoComando == "esquerda") {
                $.moverLadrao('horizontal','esquerda');
                $.moverPolicia();
            } else if (direcaoComando == "cima") {
                $.moverLadrao('vertical','cima');
                $.moverPolicia();
            } else if (direcaoComando == "direita") {
                $.moverLadrao('horizontal','direita');
                $.moverPolicia();
            } else if (direcaoComando == "baixo") {
                $.moverLadrao('vertical','baixo');
                $.moverPolicia();
            }
        };

    	// Função que move o ladrão segundo a tecla pressionada
    	$.moverLadrao = function(alinhamento, sentido) {
    		if (alinhamento == 'horizontal') {
    			if (sentido == 'esquerda') {
    				arrPosLadrao[0] = arrPosLadrao[0] - movimentacaoLadrao;
    			} else if (sentido == 'direita') {
    				arrPosLadrao[0] = arrPosLadrao[0] + movimentacaoLadrao;
    			}
    			arrPosLadrao[0] = $.ajustaLimite(arrPosLadrao[0]);
    			ladrao.style.left = arrPosLadrao[0];
    		} else if (alinhamento == 'vertical') {
    			if (sentido == 'cima') {
    				arrPosLadrao[1] = arrPosLadrao[1] - movimentacaoLadrao;
    			} else if (sentido == 'baixo') {
    				arrPosLadrao[1] = arrPosLadrao[1] + movimentacaoLadrao;
    			}
    			arrPosLadrao[1] = $.ajustaLimite(arrPosLadrao[1])
    			ladrao.style.top = arrPosLadrao[1];
    		}
            // Checa se pegou dinheiro
            $.pegouDinheiro();
    	};

    	// Função que move Policia na direção do alvo
        $.moverPolicia = function() {

        	// Definir se alvo está à direita ou à esquerda
        	$.definirPosRelXAlvo();

        	// Definir se alvo está acima ou abaixo
        	$.definirPosRelYAlvo();

        	// Checa diferença entre Policia e alvo
        	$.checaPosGeoX();
        	$.checaPosGeoY();

        	// Determinar em que direção se mexer
        	$.setDirecao();

        	// Mexer Policia
        	if (direcao == 'horizontal') {
        		if (posRelX == 'direita') {
        			arrPosPolicia[0] = arrPosPolicia[0] + movimentacaoPolicia;
        		} else if (posRelX == 'esquerda') {
        			arrPosPolicia[0] = arrPosPolicia[0] - movimentacaoPolicia;
        		}
                arrPosPolicia[0] = $.ajustaLimite(arrPosPolicia[0]);
        	} else if (direcao == 'vertical') {
        		if (posRelY == 'acima') {
        			arrPosPolicia[1] = arrPosPolicia[1] - movimentacaoPolicia;
        		} else if (posRelY == 'abaixo') {
        			arrPosPolicia[1] = arrPosPolicia[1] + movimentacaoPolicia;
        		}
                arrPosPolicia[1] = $.ajustaLimite(arrPosPolicia[1]);
        	}
    		policia.style.left = arrPosPolicia[0];
    		policia.style.top = arrPosPolicia[1];

            // Se polícia alcançou o ladrão
            if ($.alcancou(arrPosPolicia, arrPosLadrao)) {
                $.fimDeJogo("Voce foi preso!!")
            }
        };

});