import { call, put } from 'redux-saga/effects'

import { actionTypesPr as productsActions } from '../../features/products';

import { getProductsAPI, deleteProductByIdAPI, createProductAPI, createLoteAPI} from '../../api/index';

import axios from 'axios'

const LIST_TRY = '[products]/LIST_TRY';
const LIST_SUCCESS = '[products]/LIST_SUCCESS';
const LIST_FAILED = '[products]/LIST_FAILED';
const EDIT_TRY = '[products]/EDIT_TRY';
const DELETE_TRY = '[products]/DELETE_TRY';
const LOTE_TRY = '[products]/LOTE_TRY';




export default function* tryPoductsList(action) {

   /* async function getUser() {
        try {
          const response = await axios.get('/api/v1/products/');
          return response.data;
        } catch (error) {
          console.error(error);
        }
    }*/


    try {
        let URL = "";
        console.log("Begin del update..... type edit ")
        if (action.type === DELETE_TRY) {
            const response = yield deleteProductByIdAPI(action.payload.id)
        }
        else if (action.type === EDIT_TRY) {
          
            let product = action.payload;
           // console.log("action type edit ", product)
            const response = yield createProductAPI(product);
            yield put({ type: productsActions.LIST_SUCCESS, product })

        }
        else if (action.type === LOTE_TRY) {
            console.log("action lote ", action)
            let product = action.payload;
            const response = yield createLoteAPI(product);
            yield put({ type: productsActions.LIST_SUCCESS, product })
        }
        else
        {
           const response = yield getProductsAPI()
           const data = response.data.data;
           yield put({ type: productsActions.LIST_SUCCESS, data })

        }
  
    } catch (e) {
        if (!e.response) {
            console.log('tryPoductsList() Error : Network Error') ;
        }
        else {
            console.log('tryPoductsList() Error : ', e.response) ;
        }
    

        yield put({ type: productsActions.LIST_FAILED })
    }




}

