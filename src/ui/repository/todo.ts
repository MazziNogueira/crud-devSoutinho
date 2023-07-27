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
        const todosFromServer = parseTodosFromServer(
            JSON.parse(todosString)
        ).todos

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

function parseTodosFromServer(responseBody: unknown): { todos: Array<Todo> } {
    if (
        responseBody !== null &&
        typeof responseBody === 'object' &&
        'todos' in responseBody &&
        Array.isArray(responseBody.todos)
    ) {
        return {
            todos: responseBody.todos.map((todo: unknown) => {
                if (todo === null && typeof todo !== 'object') {
                    throw new Error('Invalid todo from API')
                }

                const { id, content, date, done } = todo as {
                    id: string
                    content: string
                    date: string
                    done: string
                }

                return {
                    id,
                    content,
                    done: String(done).toLowerCase() === 'true',
                    date: new Date(date),
                }
            }),
        }
    }

    return {
        todos: [],
    }
}
