import { authRequest } from '../../../utils/Api';

export const getUsers = (params) => {
	return (dispatch) => {
		authRequest({
			url: 'users',
			params
		}).then((res) => {
	      if (res) {
	        let data = {
	          list: res.data.data,
	          pagination: res.data.meta.pagination
	        };
	        dispatch({
	          type: 'INIT_USERS',
	          data
	        });
	      }
	    })
	}
}

export const getVisitors = (params) => {
	return (dispatch) => {
		authRequest({
			url: 'visitors',
			params
		}).then((res) => {
	      if (res) {
	        let data = {
	          list: res.data.data,
	          pagination: res.data.meta.pagination
	        };
	        dispatch({
	          type: 'INIT_VISITORS',
	          data
	        });
	      }
	    })
	}
}
