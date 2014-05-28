$('document').ready(function() {

        // Define a posição relativa X do alvo
        $.definirPosRelXAlvo = function() {
        	if (arrPosPolicia[0] > arrPosLadrao[0]) {
        		posRelX = 'esquerda';
        	} else if (arrPosPolicia[0] == arrPosLadrao[0]) {
        		posRelX = 'igual';
        	} else {
        		posRelX = 'direita';
        	}
        };

        // Define a posição relativa Y do alvo
        $.definirPosRelYAlvo = function() {
        	if (arrPosPolicia[1] > arrPosLadrao[1]) {
        		posRelY = 'acima';
        	} else if (arrPosPolicia[1] == arrPosLadrao[1]) {
        		posRelY = 'igual';
        	} else {
        		posRelY = 'abaixo';
        	}
        };

        // Define a posição relativa X
        $.definirPosRelX = function(cacador, presa) {
            if (cacador > presa) {
                thisPosRelX = 'esquerda';
            } else if (cacador == presa) {
                thisPosRelX = 'igual';
            } else {
                thisPosRelX = 'direita';
            }
            return thisPosRelX;
        };

        // Define a posição relativa Y
        $.definirPosRelY = function(cacador, presa) {
            if (cacador > presa) {
                thisPosRelY = 'acima';
            } else if (cacador == presa) {
                thisPosRelY = 'igual';
            } else {
                thisPosRelY = 'abaixo';
            }
            return thisPosRelY;
        };

        // Checa dif (em coords) entre o Policia e a posição x do alvo
        $.checaPosGeoX = function() {
        	if (posRelX == 'direita') {
        		diferencaX = arrPosLadrao[0] - arrPosPolicia[0];
        	} else if (posRelX == 'esquerda') {
        		diferencaX = arrPosPolicia[0] - arrPosLadrao[0];
        	} else {
        		diferencaX = 0;
        	}
        };

        // Checa dif (em coords) entre o Policia e a posição y do alvo
        $.checaPosGeoY = function() {
        	if (posRelY == 'acima') {
        		diferencaY = arrPosPolicia[1] - arrPosLadrao[1];
        	} else if (posRelY == 'abaixo') {
        		diferencaY = arrPosLadrao[1] - arrPosPolicia[1];
        	} else {
        		diferencaY = 0;
        	}
        };

        $.setDirecao = function() {
        	if (diferencaX > diferencaY) {
        		direcao = 'horizontal';
        	} else if (diferencaX < diferencaY) {
        		direcao = 'vertical';
        	} else {
        		if (Math.floor((Math.random() * 2) + 1) == 1) {
                		direcao = 'horizontal';
        		} else {
                		direcao = 'vertical';
        		}
        	}
        };

    	// Função que faz o cross-border
        $.ajustaLimite = function(posicao) {
    		if (posicao >= 600) {
    			posicao = posicao - 600;
    		} else if (posicao <= -TAMANHOOBJETO) {
    			posicao = posicao + 600;
    		}
    		return posicao;
        };
});