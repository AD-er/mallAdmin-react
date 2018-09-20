import { fromJS } from 'immutable';
const defaultState = fromJS({
	drawer: false,
	order: {},
	orders: [],
	pagination: {}
});

export default (state = defaultState, action) => {
	switch (action.type) {
	case 'INIT_ORDERS':
	  return state.merge({
	  	orders: action.data.orders,
	  	pagination: action.data.pagination
	  });
	case 'SHOW_DRAWER':
		return state.merge({
	    drawer: true,
	    order: action.data
		});
	case 'CLOSE_DRAWER':
	    return state.set('drawer', false);
    default: 
      return state;
	}
}