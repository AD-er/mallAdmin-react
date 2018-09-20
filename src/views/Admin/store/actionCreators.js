import { authRequest } from '../../../utils/Api';

export const getAdmins = (params) => {
	return (dispatch) => {
		authRequest({
			url: 'admins',
			params
		}).then((res) => {
	      if (res) {
	        let data = {
	          admins: res.data.data,
	          pagination: res.data.meta.pagination
	        };
	        dispatch({
	          type: 'INIT_ADMINS',
	          data
	        });
	      }
	    })
	}
}

export const getAdmin = () => {
	return (dispatch) => {
		authRequest('admin').then((res) => {
	      if (res && res.status === 200) {
	        dispatch({
	          type: 'INIT_ADMIN',
	          data: res.data.data,
	        });
	      }
	    })
	}
}
