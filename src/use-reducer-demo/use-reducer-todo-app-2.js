import React, { useState, useReducer } from "react"
import ReactDOM from "react-dom"

const Action = {
    ADD_TODO: 'ADD_TODO',
    REMOVE_TODO: 'REMOVE_TODO',
    TOGGLE_TODO: 'TOGGLE_TODO'
}

// 액션 생성 함수 (핵심적인 내용만 전달받으면 전달해야 할 액션 객체를 대신 생성하여 반환해주는 함수, 사용이 필수는 아니며 그냥 유틸리티 함수)
const createAddTodoAction = (text) => {
    return {
        type: Action.ADD_TODO,
        payload: { id: Date.now(), text, completed: false }
    }
}

const createRemoveTodoAction = (id) => {
    return {
        type: Action.REMOVE_TODO,
        payload: id
    }
}

const createToggleTodoAction = (id) => {
    return {
        type: Action.TOGGLE_TODO,
        payload: id
    }
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
                // 액션 생성 함수 사용 (*)
                dispatch(createAddTodoAction(todoText))
                setTodoText('')
            }}>추가</button>
            <ol>
                {
                    todos.map(todo => {
                        return <li key={todo.id}>
                            <TodoItem todo={todo}
                                      toggleTodo={(id) => {
                                            // 액션 생성 함수 사용 (*)
                                          dispatch(createToggleTodoAction(id))
                                      }}
                                      removeTodo={(id) => {
                                            // 액션 생성 함수 사용 (*)
                                          dispatch(createRemoveTodoAction(id))
                                      }}
                            />
                        </li>
                    })
                }
            </ol>
        </div>
    )
}

ReactDOM.render(<TodoApp />, document.getElementById("root"));