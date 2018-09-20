import { authRequest } from '../../../utils/Api';

export const getProfits = (params) => {
	return (dispatch) => {
		authRequest({
			url: 'products/profit',
			params
		}).then((res) => {
	      if (res) {
	        let data = {
	          profits: res.data.data,
	          pagination: res.data.meta.pagination
	        };
	        dispatch({
	          type: 'INIT_PROFITS',
	          data
	        });
	      }
	    })
	}
}
