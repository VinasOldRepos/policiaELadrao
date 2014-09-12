var TAMANHOOBJETO = 50,
    TAMANHODINHEIRO = 25,
    TEMPOPADRAO = 20,
    PONTOSPORFASE = 40,
    VALORDINHEIRO = 5,
    TEMPOBONUS = 3,
    PAUSAMOLOTOV = 4,
    TEMPORELOGIO = 7,
    MOVIMENTACAOMINIMA = 2,
    FASEDOISPOLICIAS = 3,
    CATCHTOLERANCE = 15,
    CROSSBORDERTOLERANCE = 20;

var mapSize = 500,
    tecla,
	posRelX,
	posRelY,
	diferencaX,
	diferencaY,
	direcao,
    pontos,
    dinheiroVis,
    relogioVis,
    molotovVis,
    bombaVis,
    movimentacaoLadrao,
    movimentacaoPolicia1,
    movimentacaoPolicia2,
    jogoOn,
    faseAtual,
    ultimaFase,
    tempo,
    teclaBump,
    tempoMolotov,
    ultimaPontuacao;

var arrPosPolicia1 = new Array(0, 0);
var arrPosPolicia2 = new Array(0, 0);
var arrPosLadrao = new Array(0, 0);
var arrPosDinheiro = new Array(500, 500);
var arrPosRelogio = new Array(500,500);
var arrPosMolotov = new Array(500, 500);
var arrPosBomba = new Array(500, 500);

var speedTable = new Array(
        new Array(0, 0),
        new Array(MOVIMENTACAOMINIMA, 0),
        new Array(MOVIMENTACAOMINIMA+1, 0),
        new Array(MOVIMENTACAOMINIMA+2, MOVIMENTACAOMINIMA),
        new Array(MOVIMENTACAOMINIMA+3, MOVIMENTACAOMINIMA),
        new Array(MOVIMENTACAOMINIMA+3, MOVIMENTACAOMINIMA+1),
        new Array(MOVIMENTACAOMINIMA+3, MOVIMENTACAOMINIMA+2),
        new Array(MOVIMENTACAOMINIMA+3, MOVIMENTACAOMINIMA+3),
        new Array(MOVIMENTACAOMINIMA+4, MOVIMENTACAOMINIMA+3),
        new Array(MOVIMENTACAOMINIMA+4, MOVIMENTACAOMINIMA+4),
        new Array(MOVIMENTACAOMINIMA+5, MOVIMENTACAOMINIMA+4),
        new Array(MOVIMENTACAOMINIMA+5, MOVIMENTACAOMINIMA+5),
        new Array(MOVIMENTACAOMINIMA+6, MOVIMENTACAOMINIMA+5),
        new Array(MOVIMENTACAOMINIMA+6, MOVIMENTACAOMINIMA+6),
        new Array(MOVIMENTACAOMINIMA+6, MOVIMENTACAOMINIMA+6),
        new Array(MOVIMENTACAOMINIMA+6, MOVIMENTACAOMINIMA+6),
        new Array(MOVIMENTACAOMINIMA+6, MOVIMENTACAOMINIMA+6),
        new Array(MOVIMENTACAOMINIMA+6, MOVIMENTACAOMINIMA+6),
        new Array(MOVIMENTACAOMINIMA+6, MOVIMENTACAOMINIMA+6)
    );

var preloadImages = new Array(
        "/Application/View/img/detalhes.gif",
        "/Application/View/img/start_over.png",
        "/Application/View/img/guarda_fogo_02.gif",
        "/Application/View/img/background_01.jpg",
        "/Application/View/img/background_v2.jpg",
        "/Application/View/img/bkg_01.jpg",
        "/Application/View/img/bkg_02.jpg",
        "/Application/View/img/bkg_03.jpg",
        "/Application/View/img/bkg_04.jpg",
        "/Application/View/img/bkg_05.jpg",
        "/Application/View/img/bkg_06.jpg",
        "/Application/View/img/busted.png",
        "/Application/View/img/timeisup_01.png",
        "/Application/View/img/start.png",
        "/Application/View/img/molotov_v2.png",
        "/Application/View/img/money2.png",
        "/Application/View/img/bomb_v2.png"
    );

var backgrounds = new Array(
        "bkg_01.jpg",
        "bkg_02.jpg",
        "bkg_03.jpg",
        "bkg_04.jpg",
        "bkg_05.jpg",
        "bkg_06.jpg",
        "background_v1.jpg",
        "background_v2.jpg"
    );

$.mobile.ajaxEnabled = false;
$.mobile.loadingMessage = false;

$.event.special.swipe.horizontalDistanceThreshold = 20;
$.event.special.swipe.verticalDistanceThreshold = 20;