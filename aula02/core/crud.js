const fs = require('fs')

const DB_FILE_PATH = './aula02/core/db'

console.log('[CRUD]')

function create(content) {
    //salvar o content no sistema
    fs.writeFileSync(DB_FILE_PATH, content)
    return content
}




// [SIMULATION]
console.log(create('Hoje eu tô estudando a aula 2.1!'))