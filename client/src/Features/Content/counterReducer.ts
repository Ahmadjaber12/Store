export const INCREMENT_COUNTER="INCREMENT_COUNTER";
export const DECREMENT_COUNTER="DECREMENT_COUNTER";
interface CounterAction{
    type:string,
    payload:number
}
export interface CounterState{
    data:number,
    title:string
}

 const initialState:CounterState={
        data:42,
        title:"Ahmad Zalat"
}
export function INCREMENT(amount=1){
    return {
        type:INCREMENT_COUNTER,
        payload:amount
    }
}
export function DeCREMENT(amount=1){
    return {
        type:DECREMENT_COUNTER,
        payload:amount
    }
}

export default function CounterReducer(state=initialState ,action:CounterAction ){
        switch (action.type) {
            case INCREMENT_COUNTER:
                return{
                    ...state,
                    data:state.data+action.payload
                }
            case DECREMENT_COUNTER:
                    return{
                        ...state,
                        data:state.data-action.payload
                    }
        }

        return state;
}