import { fromJS } from 'immutable';
const defaultState = fromJS({
	users: {},
	visitors: {},
});

export default (state = defaultState, action) => {
	switch (action.type) {
	case 'INIT_USERS':
	    return state.set('users', action.data);
	case 'INIT_VISITORS':
	    return state.set('visitors', action.data);
    default: 
      return state;
	}
}