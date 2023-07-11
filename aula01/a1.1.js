// [Dar bons nomes de variáveis]
var n1 = 10
var n2 = 20

console.log(n1+n2)

// Como devs, o que mais fazemos é LER código
// Contexto é extremamente importante
const userFirstInput = 10
const userSecondInput = 15

console.log(userFirstInput+userSecondInput)

// Incluir no nome da variável o tipo dela
const userFirstInputNumber = 5
const userSecondInputNumber = 15

console.log(userFirstInputNumber+userSecondInputNumber)



// No Front!
var inputDoUsuario

// No Browser:
// - string
// - elemento do DOM (campo de busca do Google)

// para indicar que é um elemento DOM, usa-se o $
const inputUsuario = document.querySelector('input').value
const $inputUsuario = document.querySelector('input')

// Booleanos
// <input value='' />
// para indicar que é booleano, usa-se 'has' ou 'is'
document.querySelector('input').hasAttribute('value') // true / false

// melhor usar vários if's do que encadear com else
if(hasAlgumaCoisa || isAlgumaCoisa) {}
if(!hasAlgumaCoisa) {}