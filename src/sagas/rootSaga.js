import { loginSaga } from './login';
import { adminCategoriesSaga } from './admin_categories';
import { adminProductsSaga } from './admin_products';
import { all } from 'redux-saga/effects';
import { updateProfileSaga } from './update_profile';

export default function* rootSaga() {
  yield all([loginSaga(), adminCategoriesSaga(), updateProfileSaga(), adminProductsSaga()]);
}
