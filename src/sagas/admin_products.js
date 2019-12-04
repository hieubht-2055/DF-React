import { takeLatest, call, put } from 'redux-saga/effects';
import * as types from './../constants/ActionTypes';
import callApi from './call_api';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* adminProductsSaga() {
  yield takeLatest(types.FECTH_PRODUCTS, workerSaga);
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(action) {
  const { data } = action;
  try {
    const response = yield call(fetchProducts, data);
    const result = response.data;

    // dispatch a success action to the store with the new dog
    yield put({ type: types.FECTH_PRODUCTS_SUCCESS, data: result });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: types.FECTH_PRODUCTS_FAILURE, error });
  }
}

// function that makes the api request and returns a Promise for response
function fetchProducts(data) {
  return callApi('GET', 'products', data);
}
