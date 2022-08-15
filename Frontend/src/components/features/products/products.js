import {createStructuredSelector} from 'reselect';

export const NAME = 'products';

// Action Types
const LIST_TRY = '[products]/LIST_TRY';
const LIST_SUCCESS = '[products]/LIST_SUCCESS';
const LIST_FAILED = '[products]/LIST_FAILED';
const EDIT_TRY = '[products]/EDIT_TRY';
const DELETE_TRY = '[products]/DELETE_TRY';
const LOTE_TRY = '[products]/LOTE_TRY';

const payload = "";

// Initial State:
const initialState = {
    dataList: [],
    isLoading: false,
}

// REDUCER:
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
       
        case actionTypesPr.LIST_TRY:
            return { ...state, isLoading: true }
        case actionTypesPr.LIST_FAILED:
            return { ...state, isLoading: false }
        case actionTypesPr.LIST_SUCCESS:
            return { ...state, isLoading: false, dataList: action.data }
        case actionTypesPr.EDIT_TRY:
                return { ...state, isLoading: true }
        case actionTypesPr.DELETE_TRY:
                return { ...state, isLoading: true }
        case actionTypesPr.LOTE_TRY:
                return { ...state, isLoading: true }
        default:
            return state
    }
}

function list(idSession) {
    return {type: LIST_TRY, payload:idSession}
}

function deletes(idSession) {
    return {type: DELETE_TRY, payload:idSession}
}

function edit(idSession) {
    return {type: EDIT_TRY, payload:idSession}
}

function lote(idSession) {
    return {type: LOTE_TRY, payload:idSession}
}

const products = (state) => state[NAME];

export const selector = createStructuredSelector({
    products,
})

export const actionCreators = {
    list, payload
}
export const actionDeletes = {
    deletes, payload
}

export const actionEdit = {
    edit, payload
}
export const actionLote = {
    lote, payload
}

export const actionTypesPr = {
    LIST_TRY,
    LIST_FAILED,
    LIST_SUCCESS,
    EDIT_TRY,
    DELETE_TRY,
    LOTE_TRY
  
}
