import { combineReducers } from 'redux-immutable';
import { reducer as mainReducer } from '../views/Main/store';
import { reducer as homeReducer } from '../views/Home/store';
import { reducer as orderReducer } from '../views/Order/store';
import { reducer as adminReducer } from '../views/Admin/store';
import { reducer as userReducer } from '../views/User/store';
import { reducer as profitReducer } from '../views/Product/store';

const reducer = combineReducers({
	main: mainReducer,
	home: homeReducer,
	order: orderReducer,
	admin: adminReducer,
	user: userReducer,
	profit: profitReducer
});

export default reducer;