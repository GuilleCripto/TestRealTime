import {combineReducers} from 'redux';

import gxSessionsReducer, {NAME as gxSessionsName} from '../features/gxSessions';
import productsReducer, {NAME as productsName} from '../features/products';

export default () => 
    combineReducers({
    [gxSessionsName]: gxSessionsReducer,
    [productsName]: productsReducer,
});