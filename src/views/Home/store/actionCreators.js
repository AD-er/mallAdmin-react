import { authRequest } from '../../../utils/Api';

export const initHome = (data) => {
	return (dispatch) => {
		authRequest({
			url: 'home',
			method: 'POST',
			data
		}).then((res) => {
	      if (res && res.status === 200) {
	      	console.log(res)
	        let data = {
	          orders: res.data.orders,
	          visitor: res.data.visitor,
	          order: res.data.order,
	          sale: res.data.sale,
	          deal: res.data.deal
	        };
	        dispatch({
	          type: 'INIT_HOME',
	          data
	        });
	      }
	    })
	}
}

export const getOrderChart = (day) => {
	return (dispatch) => {
		authRequest('charts/order/'+day).then((res) => {
	      if (res && res.status === 200) {
	        let data = {
	          day: day,
	          data: res.data
	        };
	        dispatch({
	          type: 'ORDER_CHARTS',
	          data
	        });
	      }
	    })
	}
}

export const getVisitorChart = (day) => {
	return (dispatch) => {
		authRequest('charts/visitor/'+day).then((res) => {
	      if (res && res.status === 200) {
	        let data = {
	          day: day,
	          data: res.data
	        };
	        dispatch({
	          type: 'VISITOR_CHARTS',
	          data
	        });
	      }
	    })
	}
}

export const getSaleChart = (day) => {
	return (dispatch) => {
		authRequest('charts/sale/'+day).then((res) => {
	      if (res && res.status === 200) {
	        let data = {
	          day: day,
	          data: res.data
	        };
	        dispatch({
	          type: 'SALE_CHARTS',
	          data
	        });
	      }
	    })
	}
}

export const getDealChart = (day) => {
	return (dispatch) => {
		authRequest('charts/deal/'+day).then((res) => {
	      if (res && res.status === 200) {
	        let data = {
	          day: day,
	          data: res.data
	        };
	        dispatch({
	          type: 'DEAL_CHARTS',
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

