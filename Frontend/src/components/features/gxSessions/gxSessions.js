import {createStructuredSelector} from 'reselect';

export const NAME = 'gxSessions';

// Action Types
const LIST_TRY = '[gxSessions]/LIST_TRY';
const LIST_SUCCESS = '[gxSessions]/LIST_SUCCESS';
const LIST_FAILED = '[gxSessions]/LIST_FAILED';

const payload = "";

// Initial State:
const initialState = {
    dataList: [],
    isLoading: false,
}

// REDUCER:
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
       
        case actionTypes.LIST_TRY:
            return { ...state, isLoading: true }
        case actionTypes.LIST_FAILED:
            return { ...state, isLoading: false }
        case actionTypes.LIST_SUCCESS:
            return { ...state, isLoading: false, dataList: action.data }
        default:
            return state
    }
}

function list(idSession) {
    return {type: LIST_TRY, payload:idSession}
}

const gxSessions = (state) => state[NAME];

export const selector = createStructuredSelector({
    gxSessions,
})

export const actionCreators = {
    list, payload
}

export const actionTypes = {
    LIST_TRY,
    LIST_FAILED,
    LIST_SUCCESS
}
