/* eslint-disable no-console */
import fs from 'fs' //ES6
// const fs = require('fs') => Common JS
import { v4 as uuid } from 'uuid'

const DB_FILE_PATH = './core/db'

// console.log("[CRUD]");

type UUID = string

interface Todo {
    id: UUID
    date: string
    content: string
    done: boolean
}

// CREATE
function create(content: string): Todo {
    const todo: Todo = {
        id: uuid(),
        //para chamar a data como string, usa-se o toISOString
        date: new Date().toISOString(),
        content: content,
        done: false,
    }

    const todos: Array<Todo> = [...read(), todo]

    //salvar o content no sistema
    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                todos,
                dogs: [],
            },
            null,
            2
        )
    )
    return todo
}

// READ
export function read(): Array<Todo> {
    const dbString = fs.readFileSync(DB_FILE_PATH, 'utf-8')
    const db = JSON.parse(dbString || '{}')

    // fail fast validation
    if (!db.todos) {
        return []
    }

    return db.todos
}

// UPDATE
function update(id: UUID, partialTodo: Partial<Todo>): Todo {
    // declara variável para guardar possível tarefa atualizada
    let updatedTodo

    // lê banco de dados e guarda na variável todos
    const todos = read()

    // pega o ID de cada tarefa do banco de dados e compara com o ID recebido pela função
    todos.forEach((currentTodo) => {
        const isToUpdate = currentTodo.id === id

        // se houver uma tarefa com o mesmo ID, altera seu objeto com a atualização, através do Object.assign()
        if (isToUpdate) {
            updatedTodo = Object.assign(currentTodo, partialTodo)
        }
    })

    // escreve no arquivo do DB a lista de tarefas, incluindo a tarefa atualizada, caso exista
    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                todos,
            },
            null,
            2
        )
    )

    // caso não exista uma tarefa com o mesmo ID enviado como argumento da função, um erro é lançado, pedindo novo ID
    if (!updatedTodo) {
        throw new Error('Please, provide another ID!')
    }

    // caso a tarefa exista, todo o processo acima é feito e a função retorna a própria tarefa atualizada
    return updatedTodo
}

// UPDATE content by id
// na vida real, é mais comum usar uma função para cada propriedade a ser atualizada. dessa forma, cria-se a updateContentById, updateStatusById, updateDateById, etc, todas elas chamando a função update principal
function updateContentById(id: UUID, content: string): Todo {
    return update(id, {
        content: content,
    })
}

// DELETE
function deleteById(id: UUID) {
    const todos = read()

    const todosWithoutDeleted = todos.filter((todo) => {
        if (todo.id === id) {
            return false
        }

        return true
    })

    // escreve no DB a lista de TODOs atualizada, sem a tarefa deletada
    fs.writeFileSync(
        DB_FILE_PATH,
        JSON.stringify(
            {
                todos: todosWithoutDeleted,
            },
            null,
            2
        )
    )
}

// limpeza do banco de dados
function CLEAR_DB() {
    fs.writeFileSync(DB_FILE_PATH, '')
}

// [SIMULATION]
// CLEAR_DB();

// // cria duas tarefas
// create("Primeira TODO");

// const secondTodo = create("Segunda TODO");
// deleteById(secondTodo.id);

// // cria terceira tarefa e imediatamente a atualiza
// const thirdTodo = create("Terceira TODO");
// // update(thirdTodo.id, {
// //     content: 'terceira todo atualizadaaa',
// //     done: true
// // })
// updateContentById(thirdTodo.id, "Atualizada!");

// create("Quarta TODO");

// console.log(read());
