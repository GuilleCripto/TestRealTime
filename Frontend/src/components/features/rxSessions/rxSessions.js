import {createStructuredSelector} from 'reselect';

export const NAME = 'rxSessions';

// Action Types
const LIST_TRY = '[rxSessions]/LIST_TRY';
const LIST_SUCCESS = '[rxSessions]/LIST_SUCCESS';
const LIST_FAILED = '[rxSessions]/LIST_FAILED';

const payload = "";

// Initial State:
const initialState = {
    dataList: [],
    isLoading: false,
}

// REDUCER:
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
       
        case actionTypesRx.LIST_TRY:
            return { ...state, isLoading: true }
        case actionTypesRx.LIST_FAILED:
            return { ...state, isLoading: false }
        case actionTypesRx.LIST_SUCCESS:
            return { ...state, isLoading: false, dataList: action.data }
        default:
            return state
    }
}

function list(idSession) {
    return {type: LIST_TRY, payload:idSession}
}

const rxSessions = (state) => state[NAME];

export const selector = createStructuredSelector({
    rxSessions,
})

export const actionCreators = {
    list, payload
}

export const actionTypesRx = {
    LIST_TRY,
    LIST_FAILED,
    LIST_SUCCESS
}
