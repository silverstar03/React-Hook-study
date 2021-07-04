import React, { useState, useReducer } from "react"
import ReactDOM from "react-dom"

const Action = {
    ADD_TODO: 'ADD_TODO',
    REMOVE_TODO: 'REMOVE_TODO',
    TOGGLE_TODO: 'TOGGLE_TODO'
}

function reducer(state, action) {
    switch(action.type) {
        case Action.ADD_TODO:
            return state.concat(action.payload)
        case Action.REMOVE_TODO:
            return state.filter(todo => todo.id !== action.payload)
        case Action.TOGGLE_TODO:
            return state.map(todo => {
                if(todo.id === action.payload) {
                    return { ...todo, completed: !todo.completed }
                } else {
                    return todo
                }
            })
        default:
            return state
    }
}

function TodoItem(props) {
    const { todo, removeTodo, toggleTodo } = props

    return (
        <div>
            <span onClick={() => toggleTodo(todo.id)}
                style={todo.completed ? { textDecoration: "line-through" } : null}
            >{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)}>X</button>
        </div>
    )
}

function TodoApp(props) {
    const [ todos, dispatch ] = useReducer(reducer, [])
    const [ todoText, setTodoText ] = useState("")

    return (
        <div>
            <input type="text" value={todoText} onChange={(e) => {
                setTodoText(e.target.value) }} />
            <button onClick={() => {
                dispatch({
                    type: Action.ADD_TODO,
                    payload: { id: Date.now(), text: todoText, completed: false
                    }
                })

                setTodoText('')
            }}>추가</button>
            <ol>
                {
                    todos.map(todo => {
                        return <li key={todo.id}>
                            <TodoItem todo={todo}
                                      toggleTodo={(id) => dispatch({ type:
                                          Action.TOGGLE_TODO, payload: id })}
                                      removeTodo={(id) => dispatch({ type:
                                          Action.REMOVE_TODO, payload: id })}
                            />
                        </li>
                    })
                }
            </ol>
        </div>
    )
}

ReactDOM.render(<TodoApp />, document.getElementById("root"));