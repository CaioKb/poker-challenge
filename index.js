/*
Project: Poker Winner
Language: JavaScript 
Created by: Caio K. Brasil
Description: desenvolva um programa que, de acordo com as mãos de dois jogadores, informe qual deles é o vencedor.
*/

const CARTAS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'] //array que define a ordem de valor das cartas
const NAIPES = ['D', 'H', 'S', 'C']
const RANKS = ["Um Par", "Dois Pares", "Trinca", "Straight", "Flush", "Full House", "Quadra", "Straight Flush", "Royal Flush"]

let testHandStraight = "1H 2C 3S 4S 5D"
let testHandFlush = "5H 5H 6H 7H KH"
let testHandRoyalFlush = "TH JH QH KH AH"
let testHandStraightFlush = "1H 2H 3H 4H 5H"

function getPlayersCards(cartasJogador) {
    let cartas = cartasJogador.split(' ') //receber cartas do jogador

    //separa apenas os "indices" das cartas e ordena de acordo com a ordem de valor definida no array CARTAS
    let numbers = cartas.map(n => n[0]).sort((a, b) => CARTAS.indexOf(a) - CARTAS.indexOf(b))
    let naipes = cartas.map(n => n[1]) //separar apenas os naipes

    let flush = naipes.every(n => n === n[0]) //verificar se os naipes são todos iguais

    //verificar se os números são uma sequencia
    let straight = numbers.every((num, i) => i === numbers.length - 1 || CARTAS.indexOf(num) < CARTAS.indexOf(numbers[i + 1]))

   console.log(numbers[0]) 
    if(straight && flush)
        console.log("Straight Flush")
}
