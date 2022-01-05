// AJUSTA AS OPÇÕES DE LAYOUT NA SEÇÃO DO GULDI ORIGINAL
function atualizaTexto() {
    var imgOriginal = document.getElementsByClassName("imagemDoOriginal")[0]
    if(window.innerWidth < 999) {
       $('.visualizarAgora a').attr('id', 'button-ar')
       $('#button-ar').removeAttr('href')
    } else {
       $('.visualizarAgora a').removeAttr('id')
       $('.visualizarAgora a').attr('href', 'https://www.guldi.com.br/wp-content/uploads/2021/09/popup-ra-compress.png')
    }
}
atualizaTexto();
window.addEventListener("resize", atualizaTexto);