import category, { initialState } from './category';
import createListReducer from './createListReducer';

import { categoryList } from '../actions';

export default createListReducer(categoryList, category, initialState);