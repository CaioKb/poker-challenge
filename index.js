/*
Project: Poker Challenge
Language: JavaScript 
Created by: Caio K. Brasil
Description: desenvolva um programa que, de acordo com as mãos de dois jogadores, informe qual deles é o vencedor.
*/

const CARTAS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'] //array que define a ordem de valor das cartas
const NAIPES = ['D', 'H', 'S', 'C']
const RANKS = ["Highcard", "Pair", "Two Pairs", "Three of a Kind", "Straight", "Flush", "Full House",
    "Four of a Kind", "Straight Flush", "Royal Flush"]

let hand1 = "1H 2H 3H 4H 5H"
let hand2 = "3C 3D 3S 9S 9D"

function comparePlayersHand(m1, m2) {

    let h1 = getPlayersHand(m1);
    let h2 = getPlayersHand(m2);

    console.log(RANKS[h1.hand] + " x " + RANKS[h2.hand])

    //loop para comparar as cartas e definir o vencedor
    if (h1.hand === h2.hand) {
        for (let i = (h1.card.length - 1); i >= 0; i--) {
            if (CARTAS.indexOf(h1.card[i]) > CARTAS.indexOf(h2.card[i])) {
                return "1 Wins"
            }
            if (CARTAS.indexOf(h1.card[i]) < CARTAS.indexOf(h2.card[i])) {
                return "2 Wins"
            }
            if (i === 0)
                return "Tie"
        }
    }
    return h1.hand > h2.hand ? "1 Wins" : "2 Wins"
}

function getPlayersHand(cartasJogador) {
    let cartas = cartasJogador.split(' ') //receber cartas do jogador
    let numeros = cartas.map(n => n[0]).sort((a, b) => CARTAS.indexOf(a) - CARTAS.indexOf(b))//separa apenas os "indices" das cartas e ordena de acordo com a ordem de valor definida no array CARTAS
    let naipes = cartas.map(n => n[1]) //separar apenas os naipes
    let flush = naipes.every(n => n === naipes[0]) //verificar se os naipes são todos iguais  
    let straight = numeros.every((num, i) => i === numeros.length - 1 || CARTAS.indexOf(num) === (CARTAS.indexOf(numeros[i + 1])) - 1) //verificar se os números formam uma sequencia
    let highcard = numeros[4]

    //retorno de um valor baseado no rank
    if (straight && flush && numeros[0] === 'T')
        return { hand: 9 }

    if (straight && flush)
        return { hand: 8, card: numeros[0] }

    if (checkForQuadra(numeros).isQuadra)
        return { hand: 7, card: numeros }

    if (checkForFullHouse(numeros).isFullHouse)
        return { hand: 6, card: checkForFullHouse(numeros).numTFullHouse }

    if (flush)
        return { hand: 5, card: numeros }

    if (straight)
        return { hand: 4, card: numeros[0] }

    if (checkForTrinca(numeros).isTrinca)
        return { hand: 3, card: checkForTrinca(numeros).numTrinca }

    if (checkForTwoPair(numeros).isTwoPair)
        return { hand: 2, card: checkForTwoPair(numeros).result }

    if (checkForPair(numeros).isPair)
        return { hand: 1, card: checkForPair(numeros).result }

    return { hand: 0, card: highcard }
}

//função para verificar se o jogador possui uma quadra
function checkForQuadra(numeros) {
    let quadra = numeros.slice(0, 4) // array para procurar uma sequencia de 4 numeros iguais
    let isQuadra = quadra.every((num, i) => num === quadra[i + 1] || i === quadra.length - 1) //variavel booleana
    let numQuadra = quadra[2]

    if (!isQuadra) {
        quadra = numeros.slice(1, 5)
        isQuadra = quadra.every((num, i) => num === quadra[i + 1] || i === quadra.length - 1)
    }
    return { isQuadra, numQuadra }
}

//função para verificar se o jogador possui um full house
function checkForFullHouse(numeros) {
    let valuesTrinca = checkForTrinca(numeros)
    let isFullHouse
    let valuesPair
    let array
    let numTFullHouse = valuesTrinca.numTrinca

    if (valuesTrinca.isTrinca) {
        array = numeros.filter(num => num !== valuesTrinca.numTrinca)
        valuesPair = checkForPair(array)
        if (valuesPair.isPair)
            isFullHouse = true
        else
            isFullHouse = false
    }
    return { isFullHouse, numTFullHouse }
}

//função para verificar se o jogador possui uma trinca
function checkForTrinca(numeros) {
    let trinca = numeros.slice(0, 3)
    let isTrinca = trinca.every((num, i) => num === trinca[i + 1] || i === trinca.length - 1)
    let numTrinca = numeros[2]

    if (!isTrinca) {
        trinca = numeros.slice(1, 4)
        isTrinca = trinca.every((num, i) => num === trinca[i + 1] || i === trinca.length - 1)
    }
    if (!isTrinca) {
        trinca = numeros.slice(2, 5)
        isTrinca = trinca.every((num, i) => num === trinca[i + 1] || i === trinca.length - 1)
    }
    return { isTrinca, numTrinca }
}

//função para verificar se o jogador possui um par
function checkForPair(numeros) {
    let array = numeros
    let pair1 = 0
    let isPair = array.some(
        function (num, i) {
            if (num === array[i + 1]) {
                pair1 = num
                return true
            }
            return false
        }
    )
    let result = array.filter((num, index) => array.indexOf(num) === index)
    let aux = result[3]
    result[3] = pair1
    result[result.indexOf(pair1)] = aux

    return { isPair, pair1, result }
}

//função para verificar se o jogador possui dois pares
function checkForTwoPair(numeros) {
    let array = numeros
    let result = array.filter((num, index) => array.indexOf(num) === index)
    let isTwoPair = checkForPair(array).isPair
    let pair1 = checkForPair(array).pair1

    array = array.filter(num => num !== pair1)
    isTwoPair = checkForPair(array).isPair
    pair2 = checkForPair(array).pair1

    let aux = result[2]
    result[2] = pair2
    result[result.indexOf(pair2)] = aux
    aux = result[1]
    result[1] = pair1
    result[result.indexOf(pair1)] = aux

    return { isTwoPair, result }
}

console.log(comparePlayersHand(hand1, hand2))
