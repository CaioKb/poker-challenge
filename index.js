/*
Project: Poker Winner
Language: JavaScript 
Created by: Caio K. Brasil
Description: desenvolva um programa que, de acordo com as mãos de dois jogadores, informe qual deles é o vencedor.
*/

const CARTAS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'] //array que define a ordem de valor das cartas
const NAIPES = ['D', 'H', 'S', 'C']
const RANKS = ["Carta Alta", "Um Par", "Dois Pares",
    "Trinca", "/Straight", "/Flush", "Full House",
    "Quadra", "/Straight Flush", "/Royal Flush"]


let testHand = "1H 1H 2H 2H 2H"

//let mJogador1 = document.getElementById("jg1")
//let mJogador2 = document.getElementById("jg2")

function comparePlayersHand(m1, m2) {
    let h1 = getPlayersHand(m1);
    let h2 = getPlayersHand(m2);
}


function getPlayersHand(cartasJogador) {
    let cartas = cartasJogador.split(' ') //receber cartas do jogador

    let numeros = cartas.map(n => n[0]).sort((a, b) => CARTAS.indexOf(a) - CARTAS.indexOf(b))//separa apenas os "indices" das cartas e ordena de acordo com a ordem de valor definida no array CARTAS
    let naipes = cartas.map(n => n[1]) //separar apenas os naipes

    let flush = naipes.every(n => n === n[0]) //verificar se os naipes são todos iguais  
    let straight = numeros.every((num, i) => i === numeros.length - 1 || CARTAS.indexOf(num) < CARTAS.indexOf(numeros[i + 1])) //verificar se os números formam uma sequencia

    console.log(checkForFullHouse(numeros))
}

function checkForQuadra(numeros) {
    let quadra = numeros.slice(0, 4) // array para procurar uma sequencia de 4 numeros iguais
    let isQuadra = quadra.every((num, i) => num === quadra[i + 1]) //variavel booleana
    let numQuadra = quadra[2]

    if (!isQuadra) {
        quadra = numeros.slice(1, 5)
        isQuadra = quadra.every((num, i) => num === quadra[i + 1] || i === quadra.length - 1)
    }
    return { isQuadra, numQuadra }
}

function checkForFullHouse(numeros) {
    let valuesTrinca = checkForTrinca(numeros)
    let isFullHouse
    let valuesPair
    let array
    let numTFullHouse = valuesTrinca.numTrinca
    let numPFullHouse

    if (valuesTrinca.isTrinca) {
        array = numeros.filter(num => num !== numeros[valuesTrinca.begin])
        valuesPair = checkForPair(array)
        if (valuesPair.isPair) {
            numPFullHouse = valuesPair.pair1
            isFullHouse = true
        }
        else
            isFullHouse = false
    }
    return { isFullHouse, numTFullHouse, numPFullHouse }
}

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

function checkForTwoPair(numeros) {
    let array = numeros
    let pair1 = 0
    let pair2 = 0
    let isTwoPair = array.some(
        function (num, i) {
            if (num === array[i + 1]) {
                pair1 = num
                return true
            }
            return false
        }
    )
    array = array.filter(num => num !== pair1)
    isTwoPair = array.some(
        function (num, i) {
            if (num === array[i + 1]) {
                pair2 = num
                return true
            }
            return false
        }
    );
    return { isTwoPair, pair1, pair2 }
}

function checkForPair(numeros) {
    let pair = numeros
    let pair1
    let isPair = pair.some(
        function (num, i) {
            if (num === pair[i + 1]) {
                pair1 = num
                return true
            }
            return false
        }
    )

    return { isPair, pair1 }
}


getPlayersHand(testHand)



// 0 0 K 1 1 - 1 0 K 0 2 - 1 2 K 3 3