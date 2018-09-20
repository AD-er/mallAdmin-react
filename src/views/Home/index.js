import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Radio, Table } from 'antd';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { actionCreators } from './store';
import ShowOrder from '../Order/components/ShowOrder';

class Home extends Component {
	state = {
		chartWidth: 0
	}
	componentDidMount() {
		const { orderChart, visitorChart, saleChart, dealChart } = this.props;
		const data = {
			visitor: visitorChart.day,
			order: orderChart.day,
			sale: saleChart.day,
			deal: dealChart.day
		}
		this.props.initHome(data);
		this.setState({chartWidth: this.refs.Chart.container.clientWidth})
  }

  handleOrderChange(e) {
    this.props.getOrderChart(e.target.value);
  }

  handleVisitorChange(e) {
    this.props.getVisitorChart(e.target.value);
  }

  handleSaleChange(e) {
    this.props.getSaleChart(e.target.value);
  }

  handleDealChange(e) {
    this.props.getDealChart(e.target.value);
  }

	render() {
		const { orders, orderChart, visitorChart, saleChart, dealChart, showOrder } = this.props;
		const orders_columns = [{
        title: '流水号',
        dataIndex: 'no',
        key: 'no',
      }, {
        title: '状态',
        dataIndex: 'closed',
        key: 'closed',
        render: (text, record) => (
          <span>
            {record.closed ? '已关闭' : ''}
          </span>
        ),
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={() => showOrder(record)}>查看</a>
          </span>
        ),
      }];

		return (
			<Fragment>
		    <Row gutter={8}>
		      <Col xl={8} lg={0}>
		        <Card title="待处理订单" extra={<Link to="/order?filter=send">更多</Link>} bodyStyle={{padding: '0px'}}>
		        	<Table
                size='middle'
                showHeader={false}
  							columns={orders_columns}
  							dataSource={orders}
  							pagination={false}
  						/>
		        </Card>
		      </Col>
		      <Col xl={16} lg={24}>
		      	<Row gutter={8}>
			      	<Col lg={12}>
					      <Card
					      	ref="Chart"
					      	style={{marginBottom: '8px'}}
					      	title="订单"
					      	extra={
					      		<Radio.Group value={orderChart.day} size="small" onChange={this.handleOrderChange.bind(this)}>
				          		<Radio.Button value={1}>1天</Radio.Button>
				          		<Radio.Button value={7}>7天</Radio.Button>
				          		<Radio.Button value={31}>31天</Radio.Button>
				          	</Radio.Group>
				        	}
				        >
					        <LineChart
					        	width={this.state.chartWidth}
					        	height={this.state.chartWidth/2}
					        	style={{margin: "-24px"}}
					        	data={orderChart.data}
					        	margin={0}
					        >
			    	      	<Tooltip/>
			      	      <Legend />
			      	      <XAxis dataKey="name"/>
			    	      	<CartesianGrid stroke="#eee" strokeDasharray="1 1"/>
					          <Line type="monotone" dataKey="已付" stroke="#8884d8" />
					          <Line type="monotone" dataKey="待付" stroke="#8884d8" />
					        </LineChart>
				        </Card>
			        </Col>
			        <Col lg={12}>
					      <Card
					      	style={{marginBottom: '8px'}}
					      	title="访客"
					      	extra={
					      		<Radio.Group value={visitorChart.day} size="small" onChange={this.handleVisitorChange.bind(this)}>
				          		<Radio.Button value={1}>1天</Radio.Button>
				          		<Radio.Button value={7}>7天</Radio.Button>
				          		<Radio.Button value={31}>31天</Radio.Button>
				          	</Radio.Group>
				        	}
					      >
					        <LineChart
					        	width={this.state.chartWidth}
					        	height={this.state.chartWidth/2}
					        	style={{margin: '-24px'}}
					        	data={visitorChart.data}
					        	margin={0}
					        >
					        	<XAxis dataKey="name"/>
			    	      	<Tooltip/>
			      	      <Legend />
			    	      	<CartesianGrid stroke="#eee" strokeDasharray="1 1"/>
					          <Line type="monotone" dataKey="会员" stroke="#8884d8" />
					          <Line type="monotone" dataKey="匿名" stroke="#8884d8" />
					        </LineChart>
				        </Card>
			        </Col>
			        <Col lg={12}>
					      <Card
					      	style={{marginBottom: '8px'}}
					      	title="销售量"
					      	extra={
					      		<Radio.Group value={saleChart.day} size="small" onChange={this.handleSaleChange.bind(this)}>
				          		<Radio.Button value={1}>1天</Radio.Button>
				          		<Radio.Button value={7}>7天</Radio.Button>
				          		<Radio.Button value={31}>31天</Radio.Button>
				          	</Radio.Group>
				        	}
				        >
					        <LineChart
					        	width={this.state.chartWidth}
					        	height={this.state.chartWidth/2}
					        	style={{margin: "-24px"}}
					        	data={saleChart.data}
					        	margin={0}
					        >
			    	      	<Tooltip/>
			      	      <Legend />
			      	      <XAxis dataKey="name"/>
			    	      	<CartesianGrid stroke="#eee" strokeDasharray="1 1"/>
					          <Line type="monotone" dataKey="销售量" stroke="#8884d8" />
					        </LineChart>
				        </Card>
			        </Col>
			        <Col lg={12}>
					      <Card
					      	style={{marginBottom: '8px'}}
					      	title="销售额"
					      	extra={
					      		<Radio.Group value={dealChart.day} size="small" onChange={this.handleDealChange.bind(this)}>
				          		<Radio.Button value={1}>1天</Radio.Button>
				          		<Radio.Button value={7}>7天</Radio.Button>
				          		<Radio.Button value={31}>31天</Radio.Button>
				          	</Radio.Group>
				        	}
					      >
					        <LineChart
					        	width={this.state.chartWidth}
					        	height={this.state.chartWidth/2}
					        	style={{margin: '-24px'}}
					        	data={dealChart.data}
					        	margin={0}
					        >
					        	<XAxis dataKey="name"/>
			    	      	<Tooltip/>
			      	      <Legend />
			    	      	<CartesianGrid stroke="#eee" strokeDasharray="1 1"/>
					          <Line type="monotone" dataKey="销售额" stroke="#8884d8" />
					        </LineChart>
				        </Card>
			        </Col>
		        </Row>
		      </Col>
		    </Row>
		    <ShowOrder/>
			</Fragment>
		)
	}
}

const mapStateToProps = (state) => ({
  orders: state.getIn(['home', 'orders']).toJS(),
  orderChart: state.getIn(['home', 'orderChart']).toJS(),
  visitorChart: state.getIn(['home', 'visitorChart']).toJS(),
  saleChart: state.getIn(['home', 'saleChart']).toJS(),
  dealChart: state.getIn(['home', 'dealChart']).toJS(),
});

const mapDispatchToProps = (dispatch) => ({
	initHome (data) {
		dispatch(actionCreators.initHome(data));
	},
  getOrderChart (day) {
    dispatch(actionCreators.getOrderChart(day));
  },
  getVisitorChart (day) {
    dispatch(actionCreators.getVisitorChart(day));
  },
  getSaleChart (day) {
    dispatch(actionCreators.getSaleChart(day));
  },
  getDealChart (day) {
    dispatch(actionCreators.getDealChart(day));
  },
  showOrder(text) {
    dispatch(actionCreators.getOrder(text.id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);