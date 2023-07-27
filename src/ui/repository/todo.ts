interface todoRepositoryGetParams {
    page: number
    limit: number
}

interface todoControllerGetOutput {
    todos: Todo[]
    total: number
    pages: number
}

function get({
    page,
    limit,
}: todoRepositoryGetParams): Promise<todoControllerGetOutput> {
    return fetch('/api/todos').then(async (respostaDoServidor) => {
        const todosString = await respostaDoServidor.text()

        // Como garantir a tipagem de tipos desconhecidos
        const todosFromServer = JSON.parse(todosString).todos

        // eslint-disable-next-line prettier/prettier, no-console
        console.log('page', page)
        // eslint-disable-next-line no-console
        console.log('limit', limit)

        const ALL_TODOS = todosFromServer
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex)
        const totalPages = Math.ceil(ALL_TODOS.length / limit)

        return {
            todos: paginatedTodos,
            total: ALL_TODOS.length,
            pages: totalPages,
        }
    })
}

export const todoRepository = {
    get,
}

// Model / Schema
interface Todo {
    id: string
    content: string
    date: Date
    done: boolean
}
