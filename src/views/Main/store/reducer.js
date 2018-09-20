import { fromJS } from 'immutable';
const defaultState = fromJS({
	collapsed: false,
	admin: {}
});

export default (state = defaultState, action) => {
	switch (action.type) {
    case 'ONCLICK_COLLAPSED':
	    return state.set('collapsed', !state.get('collapsed'));
	case 'INIT_LOGIN':
	    return state.set('admin', action.data);
    default: 
      return state;
	}
}