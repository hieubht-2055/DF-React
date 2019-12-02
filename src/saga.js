import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest('API_CALL_REQUEST', workerSaga);
}

// function that makes the api request and returns a Promise for response
function authenticateUser(data) {
  return axios({
    method: 'POST',
    url: 'http://localhost:3000/api/login',
    data: data
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(action) {
  const { data } = action;
  try {
    const response = yield call(authenticateUser, data);
    const result = response.data;
    // dispatch a success action to the store with the new dog
    yield put({ type: 'API_CALL_SUCCESS', data: result });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: 'API_CALL_FAILURE', error });
  }
}
