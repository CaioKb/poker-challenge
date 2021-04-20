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

let hand1 = "2H 3H 4H 5H 6H"
let hand2 = "TD JD QD KD AD"

let playerCards //variavel que recebe de cada função o dado necessário para desempate

function comparePlayersHand(m1, m2) {

    let h1 = getPlayersHand(m1);
    let h2 = getPlayersHand(m2);
    console.log("Player 1 " + "(" + hand1 + ")" + " x " + "(" + hand2 + ")" + " Player 2")
    console.log("           " + RANKS[h1.hand] + " x " + RANKS[h2.hand] + "\n")
    //loop para comparar as cartas e definir o vencedor
    if (h1.hand === h2.hand) {
        for (let i = (h1.card.length - 1); i >= 0; i--) {
            if (CARTAS.indexOf(h1.card[i]) > CARTAS.indexOf(h2.card[i])) {
                return "Player 1 Wins"
            }
            if (CARTAS.indexOf(h1.card[i]) < CARTAS.indexOf(h2.card[i])) {
                return "Player 2 Wins"
            }
            if (i === 0)
                return "Draw"
        }
    }
    return h1.hand > h2.hand ? "Player 1 Wins" : "Player 2 Wins"
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

    if (isFourOfAKind(numeros))
        return { hand: 7, card: playerCards }

    if (isFullHouse(numeros))
        return { hand: 6, card: playerCards }

    if (flush)
        return { hand: 5, card: numeros }

    if (straight)
        return { hand: 4, card: numeros[0] }

    if (isThreeOfAKind(numeros))
        return { hand: 3, card: playerCards }

    if (isTwoPair(numeros))
        return { hand: 2, card: playerCards }

    if (isPair(numeros))
        return { hand: 1, card: playerCards }

    return { hand: 0, card: highcard }
}

//função para verificar se o jogador possui uma quadra
function isFourOfAKind(numeros) {
    if (numeros[0] === numeros[3] || numeros[1] === numeros[4]) {
        playerCards = numeros[2]
        return true
    }
    return false
}

//função para verificar se o jogador possui um full house
function isFullHouse(numeros) {
    let a
    if (numeros[0] === numeros[2] || numeros[1] === numeros[3] || numeros[2] === numeros[4]) {
        a = numeros[2]
        if (numeros.some((num, i) => (num === numeros[i + 1]) && num !== a)) {
            playerCards = a
            return true
        }
    }
    return false
}

//função para verificar se o jogador possui uma trinca
function isThreeOfAKind(numeros) {
    if (numeros[0] === numeros[2] || numeros[1] === numeros[3] || numeros[2] === numeros[4]) {
        playerCards = numeros[2]
        return true
    }
    return false
}

//função para verificar se o jogador possui dois pares
function isTwoPair(numeros) {
    let a, b
    if (numeros.some((num, i) => num === numeros[i + 1] || i === numeros.length - 1)) {
        a = numeros.filter((num, index) => numeros.indexOf(num) !== index)
    }
    if (a.length === 2) {
        b = numeros.filter((num, i) => num !== a[0] && num !== a[1])
        a.unshift(b[0])
        playerCards = a
        return true
    }
    return false
}

//função para verificar se o jogador possui um par
function isPair(numeros) {
    let a, b

    if (numeros.some((num, i) => num === numeros[i + 1])) {
        a = numeros.filter((num, index) => numeros.indexOf(num) !== index)
        b = numeros.filter((num, i) => num !== a[0] && num !== a[1])
        b.push(a[0])
        playerCards = b
        return true
    }
    return false
}

console.log(comparePlayersHand(hand1, hand2))