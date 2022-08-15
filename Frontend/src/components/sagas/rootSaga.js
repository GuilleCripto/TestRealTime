import {takeLatest} from 'redux-saga/effects'
import {actionTypes as gxSessionsActions} from '../features/gxSessions';
import {actionTypesRx as rxSessionsActions} from '../features/rxSessions';
import {actionTypesPr as productsActions} from '../features/products';

import tryGxSessionsList from './gxSessions/list';
import tryRxSessionsList from './rxSessions/list';
import tryProductsList from './products/list';

export default function* rootSaga() {
    yield takeLatest(gxSessionsActions.LIST_TRY, tryGxSessionsList);
    yield takeLatest(rxSessionsActions.LIST_TRY, tryRxSessionsList);
    yield takeLatest(productsActions.LIST_TRY, tryProductsList);
    yield takeLatest(productsActions.DELETE_TRY, tryProductsList);
    yield takeLatest(productsActions.EDIT_TRY, tryProductsList);
    yield takeLatest(productsActions.LOTE_TRY, tryProductsList);
    // yield takeLatest('TRY_LIST', tryUsersList);
    // yield takeLatest('TRY_LIST', tryUsersList);
    // yield takeLatest('TRY_LIST', tryUsersList);
}