import React, { useReducer } from "react"
import ReactDOM from "react-dom"

// 액션 타입과 관련된 상수 추가
const Action = {
    INCREASE: 'INCREASE',
    DECREASE: 'DECREASE',
    ADD: 'ADD',
    SUB: 'SUB'
}

function reducer(state, action) {
    // switch - case 구문으로 변경
    // type 속성이 포함된 객체를 전달받도록 변경
    switch(action.type) {
        case Action.INCREASE:
            return { count: state.count + 1 }
        case Action.DECREASE:
            return { count: state.count - 1 }
        // 추가 정보값(payload)을 전달받는 ADD 액션 추가
        case Action.ADD:
            return { count: state.count + action.payload }
        case Action.SUB:
            return { count: state.count - action.payload }
        default:
            return state
    }
}

function CounterUsingReducer(props) {
    const [state, dispatch] = useReducer(reducer, { count: 0 })
    return (
        <div>
            <p>count : { state.count }</p>
            {/* 기존의 문자열을 보내던 방식을 개선하여 객체를 보내도록 수정 */}
            <button onClick={() => dispatch({ type: Action.INCREASE
            })}>INCREASE</button>
            <br />
            <button onClick={() => dispatch({ type: Action.DECREASE
            })}>DECREASE</button>
            <br />
            {/* 이 경우 특정 숫자(추가 정보)를 더해주는 것이므로 type 정보뿐만 아니라, 더해줄 숫자를 포함할 payload 정보도 같이 보냄 */}
            <button onClick={() => dispatch({ type: Action.ADD, payload: 10
            })}>ADD 10</button>
            <br />
            <button onClick={() => dispatch({ type: Action.SUB, payload: -10
            })}>SUB 10</button>
            <br />
            <button onClick={() => dispatch({ type: Action.SUB, payload: 5
            })}>SUB 5</button>
        </div>
    )
}

ReactDOM.render(<CounterUsingReducer />, document.getElementById("root"));