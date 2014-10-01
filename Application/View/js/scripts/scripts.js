$(document).on("dblclick", function() {
    return false;
});

$(document).on("keydown", function(e) {
    tecla = e.which;
    //if (tecla != 123) return false;
});

$(document).on("ready", function() {

    /*var fundo = document.getElementById("fundo"),
        hammertime = new Hammer(fundo);*/

    /*$.ionSound({
        sounds: [
            "heehee"
        ],
        path: "/Application/View/audio/",
        multiPlay: true,
        volume: "1.0"
    });*/

    $.gameLoop = function() {
        if (jogoOn == true) {
            objLadrao = $("#ladrao");
            if (tecla == 37) {
                $.flipHorizontal(objLadrao,"1");
                $.movimento("esquerda");
            } else if (tecla == 38) {
                $.movimento("cima");
            } else if (tecla == 39) {
                $.flipHorizontal(objLadrao,"-1");
                $.movimento("direita");
            } else if (tecla == 40) {
                $.movimento("baixo");
            // Enter - RESET
            } else if ((tecla == 13) && (tecla != teclaBump)) {
                $.resetGame();
                teclaBump = tecla;
            } else if (tecla != 13) {
                teclaBump = false;
            }
        }
        setTimeout($.gameLoop, 40);
    };

    $.resizeMapAndItems = function() {
        mapSize = $("#fundo").css("width").replace(new RegExp("px", 'g'), "");

        CROSSBORDERTOLERANCE = $.regraDeTres(CROSSBORDERTOLERANCE, mapSize);
        MOVIMENTACAOMINIMA = $.regraDeTres(MOVIMENTACAOMINIMA, mapSize);
        CATCHTOLERANCE = $.regraDeTres(CATCHTOLERANCE, mapSize);
        TAMANHOOBJETO = $.regraDeTres(TAMANHOOBJETO, mapSize);
        TAMANHOITEM = $.regraDeTres(TAMANHOITEM, mapSize);
        speedTable = new Array(
            new Array(0, 0),
            new Array(MOVIMENTACAOMINIMA, 0),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(1, mapSize), 0),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(2, mapSize), MOVIMENTACAOMINIMA),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(3, mapSize), MOVIMENTACAOMINIMA),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(3, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(1, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(3, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(2, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(3, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(3, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(4, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(3, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(4, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(4, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(5, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(4, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(5, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(5, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(5, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize)),
            new Array(MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize), MOVIMENTACAOMINIMA + $.regraDeTres(6, mapSize))
        );

        $("#fundo").css("height", mapSize);

        $(".presentation").css("height", mapSize);
        $("#backgroundImage").attr("width", mapSize+"px");
        $("#backgroundImage").attr("height", mapSize+"px");
        $("#presentationImage").attr("width", mapSize+"px");
        $("#presentationImage").attr("height", mapSize+"px");

        $(".personagem").css("width", TAMANHOOBJETO+"px");
        $(".personagem").css("height", TAMANHOOBJETO+"px");

        $(".item").css("width", TAMANHOITEM+"px");
        $(".item").css("height", TAMANHOITEM+"px");

        $(".endGameImage").css("width", mapSize+"px");
        $(".endGameImage").css("height", mapSize+"px");

        $(".setas").attr("width", $.regraDeTres(48, mapSize)+"px");
        $(".setas").attr("height", $.regraDeTres(70, mapSize)+"px");
        $(".setas").attr("padding-left", $.regraDeTres(8, mapSize)+"px");

        $(".ladraoInstruction").attr("width", $.regraDeTres(99, mapSize)+"px");
        $(".ladraoInstruction").attr("height", $.regraDeTres(86, mapSize)+"px");

        $(".barItem").attr("width", $.regraDeTres(25, mapSize)+"px");
        $(".barItem").attr("height", $.regraDeTres(25, mapSize)+"px");
        $(".barItem").css("padding-right", $.regraDeTres(14, mapSize)+"px");
        
        $("#timeBox").css("padding-left", $.regraDeTres(10, mapSize)+"px");
        $("#scoreBox").css("padding-left", $.regraDeTres(120, mapSize)+"px");
        $("#dificultyBox").css("padding-left", $.regraDeTres(240, mapSize)+"px");
        $("#dificultyBox").css("width", $.regraDeTres(95, mapSize)+"px");

        $(".actionButton").attr("width", $.regraDeTres(100, mapSize)+"px");
        $(".actionButton").attr("height", $.regraDeTres(100, mapSize)+"px");

        $(".barraInfo").css("top", mapSize);
        $(".barraInfo").css("width", mapSize);
        $(".barraInfo").css("height", $.regraDeTres(100, mapSize)+"px");
        $(".barraInfo").css("border-bottom-width", $.regraDeTres(5, mapSize)+"px");
        $(".barraInfo").css("padding-top", $.regraDeTres(5, mapSize)+"px");
        $(".barraInfo").css("padding-bottom", $.regraDeTres(5, mapSize)+"px");

        $(".mostrador").css("font-size", $.regraDeTres(32, mapSize)+"px");
        $(".mostrador").css("padding-top", $.regraDeTres(8, mapSize)+"px");

        $(".tituloMostrador").css("font-size", $.regraDeTres(17, mapSize)+"px");

        $(".action").css("font-size", $.regraDeTres(14, mapSize)+"px");
        $(".action").css("padding-top", $.regraDeTres(5, mapSize)+"px");
        $(".action").css("min-width", $.regraDeTres(20, mapSize)+"px");
        $(".action").css("max-width", $.regraDeTres(90, mapSize)+"px");

        $(".contador").css("font-size", $.regraDeTres(14, mapSize)+"px");
        
        $(".busted").css("width", mapSize+"px");
        $(".busted").css("height", mapSize+"px");
        $(".timeUp").css("width", mapSize+"px");
        $(".timeUp").css("height", mapSize+"px");

        $(".title").css("font-size", $.regraDeTres(40, mapSize)+"px");

        $(".formRanking").css("left", $.regraDeTres(152, mapSize)+"px");
        $(".formRanking").css("top", $.regraDeTres(295, mapSize)+"px");
        $(".formRanking").css("width", $.regraDeTres(200, mapSize)+"px");
        $(".formRanking").css("height", $.regraDeTres(174, mapSize)+"px");

        $(".formRanking .nickname").css("padding-left", $.regraDeTres(6, mapSize)+"px");
        $(".formRanking .nickname").css("padding-top", $.regraDeTres(6, mapSize)+"px");
        $(".formRanking .nickname").css("font-size", $.regraDeTres(11, mapSize)+"px");

        $(".formRanking .btOk").css("width", $.regraDeTres(50, mapSize)+"px");
        $(".formRanking .btOk").css("height", $.regraDeTres(50, mapSize)+"px");
        $(".formRanking .btOk").css("left", $.regraDeTres(30, mapSize)+"px");
        $(".formRanking .btOk").css("top", $.regraDeTres(98, mapSize)+"px");

        $(".formRanking .btVerRanking").css("width", $.regraDeTres(50, mapSize)+"px");
        $(".formRanking .btVerRanking").css("height", $.regraDeTres(50, mapSize)+"px");
        $(".formRanking .btVerRanking").css("left", $.regraDeTres(30, mapSize)+"px");
        $(".formRanking .btVerRanking").css("top", $.regraDeTres(105, mapSize)+"px");

        $(".formRanking .email").css("padding-left", $.regraDeTres(6, mapSize)+"px");
        $(".formRanking .email").css("padding-top", $.regraDeTres(6, mapSize)+"px");
        $(".formRanking .email").css("font-size", $.regraDeTres(11, mapSize)+"px");

        $("#ranking").css("width", mapSize+"px");
        $("#ranking").css("height", mapSize+"px");

        $("#ranking .title").css("top", $.regraDeTres(9, mapSize)+"px");
        $("#ranking .title").css("font-size", $.regraDeTres(35, mapSize)+"px");

        $(".lista").css("left", $.regraDeTres(62, mapSize)+"px");
        $(".lista").css("top", $.regraDeTres(71, mapSize)+"px");

        $(".lista .linha").css("width", $.regraDeTres(380, mapSize)+"px");
        $(".lista .linha").css("height", $.regraDeTres(25, mapSize)+"px");
        $(".lista .linha").css("padding-bottom", $.regraDeTres(4, mapSize)+"px");

        $(".lista .linha .nome").css("font-size", $.regraDeTres(18, mapSize)+"px");

        $(".lista .linha .pontuacao").css("width", $.regraDeTres(80, mapSize)+"px");
        $(".lista .linha .pontuacao").css("font-size", $.regraDeTres(18, mapSize)+"px");

        $(".rankingFooter").css("font-size", $.regraDeTres(20, mapSize)+"px");
        $(".rankingFooter").css("top", $.regraDeTres(453, mapSize)+"px");

        $("#rankingLinkButton").css("padding", $.regraDeTres(5, mapSize)+"px");

        $(".slideLabel").css("font-size", $.regraDeTres(18, mapSize)+"px");
        $(".slideLabel").css("padding-left", $.regraDeTres(70, mapSize)+"px");

        $(".ladraoInstruction").css("padding-left", $.regraDeTres(130, mapSize)+"px");

        $(".collectLabel").css("padding-left", $.regraDeTres(270, mapSize)+"px");
        $(".collectLabel").css("font-size", $.regraDeTres(18, mapSize)+"px");
        $(".collectLabel").css("width", $.regraDeTres(105, mapSize)+"px");

        $(".items").css("padding-top", $.regraDeTres(5, mapSize)+"px");

        $(".facebookLoginButton").css("top", $.regraDeTres(407, mapSize)+"px");
        $(".facebookLoginButton").css("left", $.regraDeTres(165, mapSize)+"px");
        $(".facebookLoginButton").css("width", $.regraDeTres(180, mapSize)+"px");
        $(".facebookLoginButton").css("height", $.regraDeTres(55, mapSize)+"px");
        $(".facebookLoginButton").css("font-size", $.regraDeTres(18, mapSize)+"px");

        $("#loginStatus").css("left", $.regraDeTres(73, mapSize)+"px");
        $("#loginStatus").css("top", $.regraDeTres(359, mapSize)+"px");
        $("#loginStatus").css("font-size", $.regraDeTres(20, mapSize)+"px");

        $(".buttonWeeklyRanking").css("left", $.regraDeTres(252, mapSize)+"px");
        $(".buttonWeeklyRanking").css("top", $.regraDeTres(404, mapSize)+"px");
        $(".buttonWeeklyRanking").css("width", $.regraDeTres(181, mapSize)+"px");
        $(".buttonWeeklyRanking").css("height", $.regraDeTres(49, mapSize)+"px");
        $(".buttonWeeklyRanking").css("font-size", $.regraDeTres(16, mapSize)+"px");
        $(".buttonWeeklyRanking").css("padding-top", $.regraDeTres(7, mapSize)+"px");

        $(".barLeft").css("padding-top", $.regraDeTres(10, mapSize)+"px");
    }

    $.gameClock = function() {
        if (jogoOn == true) {
            if (tempo >= 0) {
                if (tempo <= 3) {
                    $.flash($("#tempo"), "#FFD61F");
                }
                $.showClock();
                $.sortMolotov();
                $.sortBomb();
                $.apareceDinheiro();
                $("#tempo").html(tempo);
                tempo = tempo - 1;
            } else {
                $.fimDeJogo("timeUp");
            }
        }
        setTimeout($.gameClock, 1000);
    };

    $.resetGame = function() {
        $.resetAllValues();
        $.hideAllHideble();
        $.showAllShowable();
        $.relocateCharacters();
        $.apareceDinheiro();
        $.displayGameInfo();
        jogoOn = true;
    };

    $.displayGameInfo = function() {
        $("#pontos").html("0");
        $("#backgroundImage").attr("src", "/Application/View/img/background_v2.jpg");
        //$("#fundo").css("background-image", "url(/Application/View/img/background_v2.jpg)");
        $("#policia").attr("src", "/Application/View/img/guarda.gif");
        $("#actionLegenda").html('');
        $("#fase").html(faseAtual);
        $("#tempo").html(tempo);
    }

    $.relocateCharacters = function() {
        $.setObjectPosition($("#ladrao"), arrPosLadrao);
        $.setObjectPosition($("#policia"), arrPosPolicia1);
        $.setObjectPosition($("#policia2"), arrPosPolicia2);
    }

    $.hideAllHideble = function() {
        $("#instructionsBar").hide();
        $("#ranking").hide();
        $("#rankingFooter").hide();
        $("#formRanking").hide();
        $("#presentation").hide();
        $("#relogio").hide();
        $("#molotov").hide();
        $("#bomba").hide();
        $("#contador").hide();
        $("#contador2").hide();
        $("#busted").hide();
        $("#timeUp").hide();
        $("#policia2").hide();
    }

    $.showAllShowable = function() {
        $(".backgroundTap").show();
        $("#ladrao").show();
        $("#policia").show();
        $("#dinheiro").show();
        //$("#fundo").show();
        $("#scoreBar").show();
    }

    $.resetAllValues = function() {
        tempo = TEMPOPADRAO;
        dinheiroVis = false;
        relogioVis = false;
        molotovVis = false;
        bombaVis = false;
        tecla = false;
        jogoOn = false;
        movimentacaoLadrao = $.regraDeTres(6, mapSize);
        movimentacaoPolicia1 = MOVIMENTACAOMINIMA;
        faseAtual = 1;
        ultimaFase = 0;
        ultimaPontuacao = 0;
        pontos = 0;
        tempoMolotov = 0;
        arrPosLadrao[0] = 0;
        arrPosLadrao[1] = 0;
        arrPosPolicia1[0] = mapSize - TAMANHOOBJETO;
        arrPosPolicia1[1] = mapSize - TAMANHOOBJETO;
        arrPosPolicia2[0] = mapSize - TAMANHOOBJETO;
        arrPosPolicia2[1] = 0;
    }

    // Função que faz aparecer dinheiro
    $.apareceDinheiro = function() {
        if (dinheiroVis == false) {
            arrPosDinheiro = $.getRandomCoords();
            $.displayItem($("#dinheiro"), arrPosDinheiro);
            dinheiroVis = true;
        }
    };
    
    // Função que faz aparecer relogio
    $.apareceRelogio = function() {
        if (relogioVis == false) {
            arrPosRelogio = $.getRandomCoords();
            $.displayItem($("#relogio"), arrPosRelogio);
            relogioVis = true;
        }
    };
    
    // Função que faz aparecer molotov
    $.apareceMolotov = function() {
        if (molotovVis == false) {
            arrPosMolotov = $.getRandomCoords();
            $.displayItem($("#molotov"), arrPosMolotov);
            molotovVis = true;
        }
    };

    // Função que faz aparecer bomba
    $.apareceBomba = function() {
        if (bombaVis == false) {
            arrPosBomba = $.getRandomCoords();
            $.displayItem($("#bomba"), arrPosBomba);
            bombaVis = true;
        }
    };

    // Função que exibde mensagem de fim de jogo
    $.fimDeJogo = function(motivo) {
        $("#gamePoints").val($("#pontos").html());
        $.postRankingForm();
        $(".buttonWeeklyRanking").show();
        if (motivo == "busted") {
            $.busted();
        } else if (motivo == "timeUp") {
            $.timeUp();
        }
    	$.clearHideGameValues();

        // mexer aqui: exibir form se nao tiver nada no #userId
		// se tiver user Id, postar um ajax pro endGame sem parametros (ou com userID só)
		/*$("#formRanking").show();
        $("#btOk").show();
        $("#btVerRanking").show();*/
    };
    
    $.busted = function() {
        $("#busted").show();
    }
    
    $.timeUp = function() {
        $("#timeUp").show();
    }

    $.postRankingForm = function() {
        nickName = $("#nickname").val();
        lastName = $("#lastname").val();
        email = $("#email").val();
        points = $("#gamePoints").val();
        //if ((nickName) && (email) && (points)) {
            $.post('/Ranking/endGame/', {
                nickName: nickName,
                lastName: lastName,
                email: email,
                points: points
            }, function(res) {
    			res = $.parseJSON(res);
                if (res.response == 1) {
                    /*$("#formRanking").hide();
    				$("#busted").hide();
    				$("#timeUp").hide();*/
                    $("#maxScore").val(res.maxScore);
                    $("#gamePoints").val(res.lastScore);
                    $("#loginStatus").html(
                        'last score: ' + $("#gamePoints").val() + '&nbsp;&nbsp;-&nbsp;&nbsp;best score: ' + $("#maxScore").val()
                    );
                    $.post(res.redirect, {}, function(ranking) {
                        ranking = $.parseJSON(ranking);
                        $("#ranking").html(ranking.thisRanking);
                        $("#rankingFooter").attr("data-rankingType", ranking.otherRankingLink);
                        $("#rankingLinkButton").html(ranking.linkCaption);
                    });
                } else {
                    alert("Sorry,\n\nThere was an error.\n\nError: "+res.erro);
                }
                document.body.style.cursor = 'default';
                return false;
            });
        //}
    }

    $.startPressedTimmer = function(button) {
        button.attr("src", "/Application/View/img/start_over.png");
        setTimeout(function() {
           button.attr("src", "/Application/View/img/start.png");
        }, 300);
    }

    $.preloadImages = function(images) {
        for (i = 0; i < images.length; i++) {
            $('<img/>')[0].src = images[i];
        }
    }

    $.showClock = function() {
        if ((tempo == TEMPORELOGIO) && (relogioVis == false)) {
            $.apareceRelogio();
        }
    }

    $.clearHideGameValues = function() {
        tempo = 0;0
        dinheiroVis = false;
        relogioVis = false;
        molotovVis = false;
        bombaVis = false;
        jogoOn = false;

        //$("#fundo").css("background-image", "url()");
        $(".backgroundTap").hide();
        $("#ladrao").hide();
        $("#policia").hide();
        $("#policia2").hide();
        $("#dinheiro").hide();
        $("#relogio").hide();
        $("#molotov").hide();
        $("#bomba").hide();
    }

    $.loading = function() {
        $.preloadImages(preloadImages);
        $("#loading").hide();
        $("#resetGame").show();
    }

    /* ******************************* */

    $("#resetGame").on("tap", function() {
        justOpened = $("#justOpened");
        if (justOpened.val() == 1) {
            $("#presentationImage").attr(
                "src",
                "/Application/View/img/detalhes.gif"
            );
            justOpened.val(0);
        } else {
            $.startPressedTimmer($(this));
            $.resetGame();
        }
    });

    //Hammer(fundo).on("swipeleft", function() {
    //hammertime.on("swipeleft", function() {
    $("#fundo").on("swipeleft", function() {
        tecla = 37;
    }).on("swiperight", function() {
        tecla = 39;
    }).on("swipeup", function() {
        tecla = 38;
    }).on("swipedown", function() {
        tecla = 40;
    });
    
    $("#ladrao").on("swipeleft", function() {
        tecla = 37;
    }).on("swiperight", function() {
        tecla = 39;
    }).on("swipeup", function() {
        tecla = 38;
    }).on("swipedown", function() {
        tecla = 40;
    });

    /*$("#presentation").on("swiperight", function() {
        $(this).slideRight(300).delay(800);
        //$(this).hide(5000, $.resetGame());
    });*/

    $("#presentation").on("swipeleft", function() {
        if ($("#justOpened").val() == 0) {
        presentation = $(this);
            presentation.animate({
                    left: parseInt(presentation.css('left'),10) == 0 ?
                    -presentation.outerWidth() :
                    0
                },
                1000,
                function() { $.resetGame() }
            );
        }
    });

    $("#btOk").on("tap", function() {
        $(this).hide();
        $("#btVerRanking").hide()
        $.postRankingForm();
    });

    $(".buttonWeeklyRanking").on("tap", function() {
        $(this).hide();
        //$("#formRanking").hide();
        $("#busted").hide();
        $("#timeUp").hide();
        /*$.post("/Ranking/listWeeklyRanking", {}, function(ranking) {
            $("#ranking").html(ranking);
            $("#ranking").show();
        });*/
        $("#ranking").show();
        $("#rankingFooter").show();
    });

    $("#rankingLinkButton").on("tap", function() {
        type = $(this).attr("data-rankingType");
        if (type == "thisweeks") {
            rankingType = "listWeeklyRanking";
        } else if (type == "alltimes") {
            rankingType = "listAllTimesRanking";
        }
        $.post("/Ranking/" + rankingType, {}, function(ranking) {
            ranking = $.parseJSON(ranking);
            $("#ranking").html(ranking.thisRanking);
            $("#rankingLinkButton").attr("data-rankingType", ranking.otherRankingLink);
            $("#rankingLinkButton").html(ranking.linkCaption);
        });
    });

    $(".facebookLoginButton").on("click", function() {
        if (!$("#logged").val()) {
            fb_login();
        }
    });

    /* ******************************* */
    setTimeout(function() { $.loading() }, 3500);

    $.resizeMapAndItems();
    $.gameLoop();
    $.gameClock();

});