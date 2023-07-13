import fs from 'fs' //ES6

// const fs = require('fs') => Common JS

const DB_FILE_PATH = './aula02/core/db'

console.log('[CRUD]')

function create(content: string) {
    //salvar o content no sistema
    fs.writeFileSync(DB_FILE_PATH, content)
    return content
}




// [SIMULATION]
console.log(create('Hoje eu tô estudando a aula 2.1!'))