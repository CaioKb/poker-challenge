/*
Project: Poker Winner
Language: JavaScript 
Created by: Caio K. Brasil
Description: desenvolva um programa que, de acordo com as mãos de dois jogadores, informe qual deles é o vencedor.
*/

const CARTAS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'] //array que define a ordem de valor das cartas
const NAIPES = ['D', 'H', 'S', 'C']
const RANKS = ["Carta Alta", "Um Par", "Dois Pares", "Trinca", "/Straight", "/Flush", "Full House", "Quadra", "/Straight Flush", "/Royal Flush"]


let testHand = "1H 2H 3H 4H 5H"


function getPlayersCards(cartasJogador) {
    let cartas = cartasJogador.split(' ') //receber cartas do jogador

    let numeros = cartas.map(n => n[0]).sort((a, b) => CARTAS.indexOf(a) - CARTAS.indexOf(b))//separa apenas os "indices" das cartas e ordena de acordo com a ordem de valor definida no array CARTAS
    let naipes = cartas.map(n => n[1]) //separar apenas os naipes

    let flush = naipes.every(n => n === n[0]) //verificar se os naipes são todos iguais  
    let straight = numeros.every((num, i) => i === numeros.length - 1 || CARTAS.indexOf(num) < CARTAS.indexOf(numeros[i + 1])) //verificar se os números formam uma sequencia

    //console.log(checkForTrinca(numeros))
    
}

function checkForQuadra(numeros) {

    let quadra = numeros.slice(0, 4) // array para procurar uma sequencia de 4 numeros iguais
    let isQuadra = quadra.every((num, i) => num === quadra[i + 1]) //variavel booleana

    if(!isQuadra){
        quadra = numeros.slice(1, 5)
        isQuadra = quadra.every((num, i) => num === quadra[i + 1] || i === quadra.length - 1)
    }
    return isQuadra
}

function checkForFullHouse(numeros){

}

function checkForTrinca(numeros){

    let trinca = numeros.slice(0, 3)
    let isTrinca = trinca.every((num, i) => num === trinca[i + 1] || i === trinca.length - 1)

    if(!isTrinca){
        trinca = numeros.slice(1, 4)
        isTrinca = trinca.every((num, i) => num === trinca[i + 1] || i === trinca.length - 1)
    }
    if(!isTrinca){
        trinca = numeros.slice(2, 5)
        isTrinca = trinca.every((num, i) => num === trinca[i + 1] || i === trinca.length - 1)
    }

    return {isTrinca, begin}
}

function checkForTwoPair(numeros){
    let twoPair = numeros
    console.log(twoPair)
    return twoPair.some(
        function(num, i){
            if(num === twoPair[i + 1]){
                twoPair.splice(twoPair.indexOf(num), 2)
                console.log(twoPair)
                return twoPair.some((num, i) => num === twoPair[i + 1])
            }
            else{
                return false
            }
        }
    )
}

function checkForPairs(numeros){
    let pair = numeros
    return pair.some((num, i) => num === pair[i + 1])
}


getPlayersCards(testHandFullHouse)