import { authRequest } from '../../../utils/Api';

export const getCurrentAdmin = (page) => {
	return (dispatch) => {
		authRequest('admin').then((res) => {
	      if (res) {
	        let data = {
	          id: res.data.data.id,
	          name: res.data.data.name,
	          avatar: res.data.data.avatar
	        }
	        dispatch({
	          type: 'INIT_LOGIN',
	          data
	        });
	      }
	    })
	}
}
