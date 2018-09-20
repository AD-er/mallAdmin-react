import { fromJS } from 'immutable';
const defaultState = fromJS({
	admin: {},
	admins: [],
	pagination: {}
});

export default (state = defaultState, action) => {
	switch (action.type) {
	case 'INIT_ADMINS':
	    return state.merge({
	    	admins: action.data.admins,
	    	pagination: action.data.pagination
	    });
	case 'INIT_ADMIN':
	    return state.set('admin', action.data);
    default: 
      return state;
	}
}