import { authRequest } from '../../../utils/Api';

export const getOrders = (params) => {
	return (dispatch) => {
		authRequest({
			url: 'orders',
			params
		}).then((res) => {
		  if (res) {
		    let data = {
		      orders: res.data.data,
		      pagination: res.data.meta.pagination
		    };
		    dispatch({
		      type: 'INIT_ORDERS',
		      data
		    });
		  }
		})
	}
}

export const getOrder = (id) => {
	return (dispatch) => {
		authRequest('orders/'+id+'?include=orderItem').then(res => {
		  if (res) {
		    dispatch({
		      type: 'SHOW_DRAWER',
		      data: res.data.data
		    });
		  }
		});
	}
}