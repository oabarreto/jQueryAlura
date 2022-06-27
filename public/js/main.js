let tempoInicial = $("#tempo-digitacao").text();
let campo = $(".campo-digitacao");

$(document).ready(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
    $("#botao-reiniciar").attr("disabled",true);

});

function atualizaTamanhoFrase (){
    let frase = $(".frase").text();
    let numPalavras = frase.split(" ").length;
    let tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);

}

function inicializaContadores () {
    campo.on("input", function() {
        let conteudo = campo.val();
        let qtdPalavras = conteudo.split(/\s+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);
        $("#contador-caracteres").text(conteudo.length);
    })
    

}

function inicializaCronometro() { 
    let tempoRestante = $("#tempo-digitacao").text();

    campo.one("focus", function() {
        let retID = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            $("#botao-reiniciar").attr("disabled",true);

            if (tempoRestante < 1) {
                clearInterval(retID);
                finalizaJogo();
            }
        },1000);
    });
}

function inicializaMarcadores() {
    let frase = $(".frase").text();
    campo.on("input", function() {
        let digitado = campo.val();
        let comparavel = frase.substr(0 , digitado.length);

        if(digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    $("#botao-reiniciar").attr("disabled",false);
    inserePlacar();
}

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    $("#botao-reiniciar").attr("disabled",true);
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde"); 
}
