import { fromJS } from 'immutable';
const defaultState = fromJS({
	orders: [],
	orderChart: {
		day: 1,
		data: [
		  {name: '00:00', 已付: 4000, 待付: 2400},
		  {name: '01:00', 已付: 3000, 待付: 1398},
		  {name: '02:00', 已付: 2000, 待付: 9800},
		  {name: '03:00', 已付: 2780, 待付: 3908},
		  {name: '04:00', 已付: 1890, 待付: 4800},
		  {name: '05:00', 已付: 2390, 待付: 3800},
		  {name: '06:00', 已付: 3490, 待付: 4300},
		  {name: '07:00', 已付: 4000, 待付: 2400},
		  {name: '08:00', 已付: 3000, 待付: 1398},
		  {name: '09:00', 已付: 2000, 待付: 9800},
		  {name: '10:00', 已付: 2780, 待付: 3908},
		  {name: '11:00', 已付: 3000, 待付: 1398},
		  {name: '12:00', 已付: 2000, 待付: 9800},
		  {name: '13:00', 已付: 2780, 待付: 3908},
		  {name: '14:00', 已付: 1890, 待付: 4800},
		  {name: '15:00', 已付: 2390, 待付: 3800},
		  {name: '16:00', 已付: 3490, 待付: 4300},
		  {name: '17:00', 已付: 4000, 待付: 2400},
		  {name: '18:00', 已付: 3000, 待付: 1398},
		  {name: '19:00', 已付: 2000, 待付: 9800},
		  {name: '20:00', 已付: 4000, 待付: 2400},
		  {name: '21:00', 已付: 3000, 待付: 1398},
		  {name: '22:00', 已付: 2000, 待付: 9800},
		  {name: '23:00', 已付: 2780, 待付: 3908},
		]
	},
	visitorChart: {
		day: 1,
		data: [
		  {name: '00:00', 会员: 2400, 匿名: 2400},
		  {name: '01:00', 会员: 1398, 匿名: 2210},
		  {name: '02:00', 会员: 9800, 匿名: 2290},
		  {name: '03:00', 会员: 3908, 匿名: 2000},
		  {name: '04:00', 会员: 4800, 匿名: 2181},
		  {name: '05:00', 会员: 3800, 匿名: 2500},
		  {name: '06:00', 会员: 4300, 匿名: 2100},
		  {name: '07:00', 会员: 2400, 匿名: 2400},
		  {name: '08:00', 会员: 1398, 匿名: 2210},
		  {name: '09:00', 会员: 9800, 匿名: 2290},
		  {name: '10:00', 会员: 3908, 匿名: 2000},
		  {name: '11:00', 会员: 1398, 匿名: 2210},
		  {name: '12:00', 会员: 9800, 匿名: 2290},
		  {name: '13:00', 会员: 3908, 匿名: 2000},
		  {name: '14:00', 会员: 4800, 匿名: 2181},
		  {name: '15:00', 会员: 3800, 匿名: 2500},
		  {name: '16:00', 会员: 4300, 匿名: 2100},
		  {name: '17:00', 会员: 2400, 匿名: 2400},
		  {name: '18:00', 会员: 1398, 匿名: 2210},
		  {name: '19:00', 会员: 9800, 匿名: 2290},
		  {name: '20:00', 会员: 3908, 匿名: 2000},
		  {name: '21:00', 会员: 1398, 匿名: 2210},
		  {name: '22:00', 会员: 9800, 匿名: 2290},
		  {name: '23:00', 会员: 3908, 匿名: 2000},
		]
	},
	saleChart: {
		day: 7,
		data: [
		  {name: '09-09', 销售量: 4000},
		  {name: '09-10', 销售量: 3000},
		  {name: '09-11', 销售量: 2000},
		  {name: '09-12', 销售量: 2780},
		  {name: '09-13', 销售量: 1890},
		  {name: '09-14', 销售量: 2390},
		  {name: '09-15', 销售量: 3490},
		]
	},
	dealChart: {
		day: 7,
		data: [
		  {name: '09-09', 销售额: 2400},
		  {name: '09-10', 销售额: 2210},
		  {name: '09-11', 销售额: 2290},
		  {name: '09-12', 销售额: 2000},
		  {name: '09-13', 销售额: 2181},
		  {name: '09-14', 销售额: 2500},
		  {name: '09-15', 销售额: 2100},
		]
	},
});

export default (state = defaultState, action) => {
	switch (action.type) {
	case 'INIT_HOME':
	    return state.merge({
	    	orders: action.data.orders,
	    	orderChart: action.data.order,
	    	visitorChart: action.data.visitor,
	    	saleChart: action.data.sale,
	    	dealChart: action.data.deal
	    });
	case 'ORDER_CHARTS':
	    return state.set('orderChart', fromJS(action.data));
	case 'VISITOR_CHARTS':
	    return state.set('visitorChart', fromJS(action.data));
	case 'SALE_CHARTS':
	    return state.set('saleChart', fromJS(action.data));
	case 'DEAL_CHARTS':
	    return state.set('dealChart', fromJS(action.data));
    default: 
      return state;
	}
}