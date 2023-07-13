import fs from 'fs' //ES6
// const fs = require('fs') => Common JS
import { v4 as uuid } from 'uuid'

const DB_FILE_PATH = './aula02/core/db'

console.log('[CRUD]')

interface Todo {
    id: string,
    date: string;
    content: string;
    done: boolean
}

// CREATE
function create(content: string): Todo {
    const todo: Todo = {
        id: uuid(),
        //para chamar a data como string, usa-se o toISOString
        date: new Date().toISOString(),
        content: content,
        done: false
    }

    const todos: Array<Todo> = [
        ...read(),
        todo,
    ]

    //salvar o content no sistema
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos,
        dogs: []
    }, null, 2))
    return todo
}


// READ
function read(): Array<Todo> {
    const dbString = fs.readFileSync(DB_FILE_PATH, 'utf-8')
    const db = JSON.parse(dbString || '{}')

    // fail fast validation
    if(!db.todos) {
        return []
    }

    return db.todos
}


// UPDATE
function update(id: string, partialTodo: Partial<Todo>): Todo {
    // declara variável para guardar possível tarefa atualizada
    let updatedTodo

    // lê banco de dados e guarda na variável todos
    const todos = read()

    // pega o ID de cada tarefa do banco de dados e compara com o ID recebido pela função 
    todos.forEach((currentTodo) => {
        const isToUpdate = currentTodo.id === id

        // se houver uma tarefa com o mesmo ID, altera seu objeto com a atualização, através do Object.assign()
        if(isToUpdate) {
            updatedTodo = Object.assign(currentTodo, partialTodo)
        }
    })
  
    // escreve no arquivo do DB a lista de tarefas, incluindo a tarefa atualizada, caso exista
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos
    }, null, 2))
  
    // caso não exista uma tarefa com o mesmo ID enviado como argumento da função, um erro é lançado, pedindo novo ID
    if(!updatedTodo) {
        throw new Error('Please, provide another ID!')
    }

    // caso a tarefa exista, todo o processo acima é feito e a função retorna a própria tarefa atualizada
    return updatedTodo
}


// na vida real, é mais comum usar uma função para cada propriedade a ser atualizada. dessa forma, cria-se a updateContentById, updateStatusById, updateDateById, etc, todas elas chamando a função update principal
function updateContentById(id: string, content: string): Todo {
    return update(id, {
        content: content
    })
}

// limpeza do banco de dados
function CLEAR_DB(){
    fs.writeFileSync(DB_FILE_PATH, '')
}




// [SIMULATION]
CLEAR_DB()

// cria duas tarefas
create('Primeira TODO')
create('Segunda TODOoo')

// cria terceira tarefa e imediatamente a atualiza
const terceiraTodo = create('Terceira Todo')
// update(terceiraTodo.id, {
//     content: 'terceira todo atualizadaaa',
//     done: true
// })
updateContentById(terceiraTodo.id, 'Atualizada!')

console.log(read()) 