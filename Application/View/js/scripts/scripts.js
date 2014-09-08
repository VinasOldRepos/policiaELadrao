$(document).on("dblclick", function() {
    return false;
});

$(document).on("keydown", function(e) {
    tecla = e.which;
    //if (tecla != 123) return false;
});

$(document).on("ready", function() {

    /*var fundo = document.getElementById("l_fundo"),
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
        $("#l_fundo").css("background-image", "url(/Application/View/img/background_v2.jpg)");
        $("#policiaImagem").attr("src", "/Application/View/img/guarda.gif");
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
        //$("#l_fundo").show();
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
        movimentacaoLadrao = 6;
        movimentacaoPolicia1 = MOVIMENTACAOMINIMA;
        faseAtual = 1;
        ultimaFase = 0;
        ultimaPontuacao = 0;
        pontos = 0;
        tempoMolotov = 0;
        arrPosLadrao[0] = 0;
        arrPosLadrao[1] = 0;
        arrPosPolicia1[0] = 500 - TAMANHOOBJETO;
        arrPosPolicia1[1] = 500 - TAMANHOOBJETO;
        arrPosPolicia2[0] = 500 - TAMANHOOBJETO;
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

        //$("#l_fundo").css("background-image", "url()");
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
            $("#presentation").css(
                "background-image",
                "url('/Application/View/img/detalhes.gif')"
            );
            justOpened.val(0);
        } else {
            $.startPressedTimmer($(this));
            $.resetGame();
        }
    });

    //Hammer(fundo).on("swipeleft", function() {
    //hammertime.on("swipeleft", function() {
    $("#l_fundo").on("swipeleft", function() {
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

    $.gameLoop();
    $.gameClock();

});