import { combineReducers } from 'redux';
import adminCategories from './admin_categories';
import user from './user';
import adminProducts from './admin_products';

const reducer = combineReducers({
  adminCategories,
  user,
  adminProducts
});

export default reducer;
