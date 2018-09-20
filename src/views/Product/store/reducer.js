import { fromJS } from 'immutable';
const defaultState = fromJS({
	profits: [],
	pagination: {}
});

export default (state = defaultState, action) => {
	switch (action.type) {
	case 'INIT_PROFITS':
	    return state.merge({
	    	profits: action.data.profits,
	    	pagination: action.data.pagination
	    });
    default: 
      return state;
	}
}