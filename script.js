const html = document.querySelector('html')
const focoBt= document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt= document.querySelector('.app__card-button--longo')
const banner= document.querySelector('.app__image')
const titulo=document.querySelector('.app__title')
const butoes =document.querySelectorAll('.app__card-button')
const musicaFocoInput=document.querySelector('#alternar-musica')
const musica = new Audio ('./sons/luna-rise-part-one.mp3')
const StartPauseBt=document.querySelector("#start-pause")
const iniciarOuPausarBt=document.querySelector("#start-pause span")
const musicaIniciar=new Audio('./sons/play.wav')
const musicaPausar=new Audio('./sons/pause.mp3')
const musicaFim=new Audio('./sons/beep.mp3')
const tempoNaTela=document.querySelector("#timer")
const imagemPausePlay=document.querySelector(".app__card-primary-button-wrapper img")
let tempoDecorridoEmSegundos=1500
let intervaloId=null
musica.loop=true

musicaFocoInput.addEventListener('change',()=> {
    if (musica.paused){
        musica.play()
    }   
    else {
        musica.pause()
    }
})

focoBt.addEventListener('click', ()=> { 
    tempoDecorridoEmSegundos=1500
    alterarContexto("foco")
    focoBt.classList.add("active")
})
curtoBt.addEventListener('click', ()=> {
    tempoDecorridoEmSegundos=300
    alterarContexto("descanso-curto")
    curtoBt.classList.add("active")
})
longoBt.addEventListener('click', ()=> {
    tempoDecorridoEmSegundos=900
    alterarContexto("descanso-longo")
    longoBt.classList.add("active")
})

function alterarContexto(contexto){
    mostrarTempo()
    butoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto',contexto)
    banner.setAttribute('src',`./imagens/${contexto}.png `)
    switch (contexto){
        case "foco":
            titulo.innerHTML=`
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML=`Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML=`Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`
            break;

    }

}
const ContagemRegressiva=() =>{
    if(tempoDecorridoEmSegundos<=0){
        zerar()
        return
    }
    tempoDecorridoEmSegundos-=1
    mostrarTempo()

}
StartPauseBt.addEventListener('click',IniciarOuPausar)

function IniciarOuPausar(){
    if(intervaloId){
        zerar()
        return
    }
    intervaloId=setInterval(ContagemRegressiva,1000)
    imagemPausePlay.setAttribute("src","./imagens/pause.png")
    iniciarOuPausarBt.textContent="Pausar"
    mostrarTempo()
    TocarSomIniciar()


}
function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent="Começar"
    imagemPausePlay.setAttribute("src","./imagens/play_arrow.png")
    intervaloId=null
    TocarSomPause()
    TocarSomFim()

}

function TocarSomIniciar(){
    musicaIniciar.play()

}
function TocarSomPause(){
    if(tempoDecorridoEmSegundos>0){
        musicaPausar.play()
    }
}
function TocarSomFim(){
    if (tempoDecorridoEmSegundos<=0)
        musicaFim.play()

}
function mostrarTempo(){
    const tempo=new Date (tempoDecorridoEmSegundos * 1000)
    const tempoFormatado=tempo.toLocaleTimeString("pt-Br",{minute:"2-digit",second:"2-digit"})
    tempoNaTela.innerHTML=`${tempoFormatado}`
}
mostrarTempo()