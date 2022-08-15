import { call, put } from 'redux-saga/effects'

import { actionTypesRx as rxSessionActions } from '../../features/rxSessions';


export default function* tryRxSessionsList(action) {
    try {
        let URL = "";


     
        if (action.payload.type === "imsi") {
            URL = `http://localhost:8090/pcrf/V1/GxSessionController/findBySupi/imsi-${action.payload.valueOfFind}`;
        }
        else {
            URL = `http://localhost:8090/pcrf/V1/GxSessionController/findBy${action.payload.type}/${action.payload.valueOfFind}`;
        }
        //imsi-204030202001
        
        const response = yield call(fetch, URL)

        console.log("This is Response =====> ", response)
        const data = yield call([response, 'json'])
      /*  if (data === undefined) {
            data = {}
        }*/
        console.log("this data ", data)
        yield put({ type: rxSessionActions.LIST_SUCCESS, data })
    } catch (e) {
        if (!e.response) {
            console.log('tryRxSessionsList() Error : Network Error') ;

        }
        else {
            console.log('tryRxSessionsList() Error : ', e.response) ;
        }
          

        yield put({ type: rxSessionActions.LIST_FAILED })
    }
}

