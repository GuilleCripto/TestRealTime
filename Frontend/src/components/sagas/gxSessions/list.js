import { call, put } from 'redux-saga/effects'

import { actionTypes as gxSessionActions } from '../../features/gxSessions';


export default function* tryGxSessionsList(action) {
    try {
        let URL = "";
      

     
        if (action.payload.type === "imsi") {
            URL = `http://localhost:8090/pcrf/V1/GxSessionController/findBySupi/imsi-${action.payload.valueOfFind}`;
        }
        else {
            URL = `http://localhost:8090/pcrf/V1/GxSessionController/findBy${action.payload.type}/${action.payload.valueOfFind}`;
        }

        const response = yield call(fetch, URL)
        const data = yield call([response, 'json'])

        console.log("this data ", data)
        yield put({ type: gxSessionActions.LIST_SUCCESS, data })
    } catch (e) {
        if (!e.response) {
            console.log('tryRxSessionsList() Error : Network Error') ;

        }
        else {
            console.log('tryRxSessionsList() Error : ', e.response) ;
        }
        yield put({ type: gxSessionActions.LIST_FAILED })
    }
}

